import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import get from "lodash/get";
import { CookieSessionKey } from "../session/constants";

const mutex = new Mutex();

function isAdmin() {
  const pathname = get(window, "location.pathname", "");
  return pathname?.includes("admin");
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/`,
  prepareHeaders: (headers, { endpoint }) => {
    headers.set("x-client-ip", "1.1.1.1");
    headers.set("timezone", (dayjs().utcOffset() / 60).toString());
    const token = Cookies.get(CookieSessionKey.user);
    const tokenAdmin = Cookies.get(CookieSessionKey.admin);

    if (endpoint !== "refresh") {
      headers.set("Authorization", `Bearer ${isAdmin() ? tokenAdmin : token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  // const { getState, dispatch } = api;

  let result = await baseQuery(args, api, extraOptions);

  const isAuthorizeError = result.error && result.error.status === 401;
  if (isAuthorizeError) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        //TODO:: refresh token
        // const refreshResult = await baseQuery(
        //   "/refreshToken",
        //   api,
        //   extraOptions
        // );
        // if (refreshResult.data) {
        //   api.dispatch(tokenReceived(refreshResult.data));
        //   // retry the initial query
        //   result = await baseQuery(args, api, extraOptions);
        // } else {
        //   api.dispatch(loggedOut());
        // }
        Cookies.remove(
          isAdmin() ? CookieSessionKey.admin : CookieSessionKey.user
        );
        localStorage.clear();
        api.dispatch({ type: "user/logout" });
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseQueryApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
