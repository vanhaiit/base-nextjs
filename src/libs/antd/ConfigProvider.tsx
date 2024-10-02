"use client";
import { ConfigProvider } from "antd";
import de_DE from "antd/es/locale/de_DE";
import en_US from "antd/es/locale/en_US";
import { useLocale } from "next-intl";
import React, { createContext, useContext, useMemo, useState } from "react";
import { NotificationProvider } from "./notification/NotificationProvider";
import { DarkTheme, LightTheme } from "./theme-config";
import { ThemeContextStates } from "./types";
import { ThemeMode } from "../theme/types";

export const ThemeStackContext = createContext<ThemeContextStates>({
  theme: undefined,
});

export function useTheme(): ThemeContextStates {
  return useContext(ThemeStackContext);
}

const AntdConfigProvider = ({
  children,
  theme,
}: React.PropsWithChildren & { theme?: ThemeMode }) => {
  const [mode] = useState<string | undefined>(theme || ThemeMode.dark);
  const locale = useLocale();

  const _locale = useMemo(() => {
    switch (locale) {
      case "en":
        return en_US;
      case "de":
        return de_DE;
      default:
        return en_US;
    }
  }, [locale]);

  return (
    <ThemeStackContext.Provider value={{ theme: theme }}>
      <ConfigProvider
        theme={mode !== ThemeMode.light ? LightTheme : DarkTheme}
        locale={_locale}
      >
        <NotificationProvider>{children}</NotificationProvider>
      </ConfigProvider>
    </ThemeStackContext.Provider>
  );
};

export default AntdConfigProvider;
