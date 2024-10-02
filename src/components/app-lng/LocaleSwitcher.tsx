import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { routing } from "@/libs/i18n/routing";
import { Suspense } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <Suspense>
      <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </option>
        ))}
      </LocaleSwitcherSelect>
    </Suspense>
  );
}
