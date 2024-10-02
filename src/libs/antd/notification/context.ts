import { createContext } from "react";
import { Notification, NotificationParams } from "../types";

export const NotificationContext = createContext<Notification>({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  error: (params: NotificationParams) => {},
  info: (params: NotificationParams) => {},
  success: (params: NotificationParams) => {},
  warning: (params: NotificationParams) => {},
});
