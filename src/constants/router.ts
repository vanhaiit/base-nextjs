import pathsToArray from "@/utils/convert-router";

export const PathRouter = {
  PUBLIC: {
    EMPTY: "",
    DEFAULT: "/",
    LOGIN: "/login",
  },
  PROTECTED: {
    GUIDE: "/guide",
  },
};

export const PublicRouters = pathsToArray(PathRouter.PUBLIC);
export const ProtectedRouters = pathsToArray(PathRouter.PROTECTED);
