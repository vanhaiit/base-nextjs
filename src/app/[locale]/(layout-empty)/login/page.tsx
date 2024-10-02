"use client";
import { create, remove } from "@/app/actions/session";
import { Input } from "antd";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("LoginPage");
  return (
    <section>
      <div className="w-full h-[100vh] flex bg-slate-400 justify-center items-center">
        <div className="w-80">
          <form action={create}>
            <div className="w-80 gap-5">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <button
                className="w-full h-10 bg-blue-500 rounded-sm"
                type="submit"
              >
                {t("signIn")}
              </button>
            </div>
          </form>
          <form action={remove}>
            <button className="w-full h-10 bg-red-500 rounded-sm" type="submit">
              {t("signOut")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
