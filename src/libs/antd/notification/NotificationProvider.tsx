"use client";
import CloseIcon from "@/assets/icons/close-notify.svg";
import ErrorIcon from "@/assets/icons/error-notify.svg";
import SuccessIcon from "@/assets/icons/success-notify.svg";
import { notification } from "antd";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { NotificationDuration } from "../constants";
import { NotificationParams, NotificationProviderProps } from "../types";
import { NotificationContext } from "./context";

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const t = useTranslations("");

  const [rawApi, contextHolder] = notification.useNotification();

  const error = useCallback(
    ({ message, description, ...props }: NotificationParams) => {
      rawApi.error({
        className: `toast-error rounded-[8px]`,
        style: {
          backgroundColor: "var(--color-sematic-error-interactive-2)",
        },
        icon: <ErrorIcon />,
        message: (
          <p className="capitalize text-text-primary-2 text-[16px] font-[700]">
            {message ?? "Action Failed"}
          </p>
        ),
        description: (
          <div className="text-text-secondary text-[14px]">
            {description || "Description"}
          </div>
        ),
        duration: NotificationDuration,
        closeIcon: <CloseIcon />,
        ...props,
      });
    },
    [rawApi, t]
  );

  const info = useCallback(
    ({ className, message, icon, ...props }: NotificationParams) => {
      rawApi.info({
        className,
        icon,
        message: message ?? t("notification.info"),
        duration: NotificationDuration,
        closeIcon: <CloseIcon />,
        ...props,
      });
    },
    [rawApi, t]
  );

  const warning = useCallback(
    ({ className, message, icon, ...props }: NotificationParams) => {
      rawApi.warning({
        className,
        icon,
        message: message ?? t("notification.warning"),
        duration: NotificationDuration,
        closeIcon: <CloseIcon />,
        ...props,
      });
    },
    [rawApi, t]
  );

  const success = useCallback(
    ({
      className = "",
      message,
      description,
      ...props
    }: NotificationParams) => {
      rawApi.success({
        className: `toast-success rounded-[8px] ${className}`,
        style: {
          backgroundColor: "var(--color-sematic-success-interactive-1)",
        },
        icon: <SuccessIcon />,
        message: (
          <p className="capitalize text-text-primary-2 text-[16px] font-[700]">
            {message ?? "Action Completed"}
          </p>
        ),

        description: (
          <div className="text-text-secondary text-[14px]">{description}</div>
        ),
        duration: NotificationDuration,
        closeIcon: <CloseIcon />,
        ...props,
      });
    },
    [rawApi, t]
  );

  return (
    <NotificationContext.Provider
      value={{
        rawApi,
        error,
        info,
        success,
        warning,
      }}
    >
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
};
