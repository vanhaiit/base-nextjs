import AntdConfigProvider from "@/libs/antd/ConfigProvider";
import { routing } from "@/libs/i18n/routing";
import { ReduxProvider } from "@/libs/redux/provider";
import SocketProvider from "@/libs/socket/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { ReactNode } from "react";

const geistSans = localFont({
  src: "../../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const theme = cookies().get("theme_mode")?.value;
  return (
    <html lang="en">
      <NextIntlClientProvider messages={messages}>
        <AntdRegistry>
          <ReduxProvider>
            <AntdConfigProvider>
              <SocketProvider>
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased ${theme}`}
                >
                  {children}
                </body>
              </SocketProvider>
            </AntdConfigProvider>
          </ReduxProvider>
        </AntdRegistry>
      </NextIntlClientProvider>
    </html>
  );
}
