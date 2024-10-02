import Cookies from "js-cookie";
import { CookieKey } from "./constants";
import { ThemeMode } from "./types";

export const onEnableDarkMode = (value: ThemeMode) => {
  if (ThemeMode.dark === value) {
    Cookies.set(CookieKey, ThemeMode.dark);
    document.body.classList.remove(ThemeMode.light);
    document.body.classList.add(ThemeMode.dark);
  } else {
    Cookies.set(CookieKey, ThemeMode.light);
    document.body.classList.remove(ThemeMode.dark);
    document.body.classList.add(ThemeMode.light);
  }
};
