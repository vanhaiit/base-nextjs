"use client";
import LocaleSwitcher from "@/components/app-lng/LocaleSwitcher";
import AppTable from "@/components/app-table";
import { useAppNotification } from "@/libs/antd/hooks/useAppNotification";
import { NotificationType } from "@/libs/antd/types";
import { onEnableDarkMode } from "@/libs/theme";
import { ThemeMode } from "@/libs/theme/types";
import { Button, Flex, Space } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

const App: React.FC = () => {
  const t = useTranslations("LocaleSwitcher");
  const notification = useAppNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  return (
    <div className="bg-[var(--background)]">
      <Flex vertical gap="middle">
        <Flex gap="middle" wrap>
          <Button color="default" variant="solid">
            Solid
          </Button>
          <Button color="default" variant="outlined">
            Outlined
          </Button>
          <Button color="default" variant="dashed">
            Dashed
          </Button>
          <Button color="default" variant="filled">
            Filled
          </Button>
          <Button color="default" variant="text">
            Text
          </Button>
          <Button color="default" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="middle" wrap>
          <Button color="primary" variant="solid">
            Solid
          </Button>
          <Button color="primary" variant="outlined">
            Outlined
          </Button>
          <Button color="primary" variant="dashed">
            Dashed
          </Button>
          <Button color="primary" variant="filled">
            Filled
          </Button>
          <Button color="primary" variant="text">
            Text
          </Button>
          <Button color="primary" variant="link">
            Link
          </Button>
        </Flex>
        <Flex gap="middle" wrap>
          <Button color="danger" variant="solid">
            Solid
          </Button>
          <Button color="danger" variant="outlined">
            Outlined
          </Button>
          <Button color="danger" variant="dashed">
            Dashed
          </Button>
          <Button color="danger" variant="filled">
            Filled
          </Button>
          <Button color="danger" variant="text">
            Text
          </Button>
          <Button color="danger" variant="link">
            Link
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <AppTable />
      </Flex>
      <Flex>
        <div>
          <h1 className="font-bold text-2xl">Change Language </h1>
          <p>EX: {t("label")}</p>
          <LocaleSwitcher />
        </div>
      </Flex>
      <Flex>
        <div>
          <h1 className="font-bold text-2xl">Notification </h1>
          <Space>
            <Button onClick={() => openNotificationWithIcon("success")}>
              Success
            </Button>
            <Button onClick={() => openNotificationWithIcon("info")}>
              Info
            </Button>
            <Button onClick={() => openNotificationWithIcon("warning")}>
              Warning
            </Button>
            <Button onClick={() => openNotificationWithIcon("error")}>
              Error
            </Button>
          </Space>
        </div>
      </Flex>
      <Flex>
        <div>
          <h1 className="font-bold text-2xl">Change Theme </h1>
          <Space>
            <Button onClick={() => onEnableDarkMode(ThemeMode.light)}>
              Light
            </Button>
            <Button onClick={() => onEnableDarkMode(ThemeMode.dark)}>
              Dark
            </Button>
          </Space>
        </div>
      </Flex>
    </div>
  );
};

export default App;
