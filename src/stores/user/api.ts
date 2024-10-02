import { baseQueryApi } from "@/libs/redux/base-query";
import { APIResponse } from "@/types/http";

export const userApi = baseQueryApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<APIResponse<any>, any>({
      query: (payload) => {
        return {
          url: "auth/login",
          body: payload,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useLoginMutation } = userApi;
