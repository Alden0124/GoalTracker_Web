import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

// 環境變數判斷
const isProd = process.env.NODE_ENV === "production";

// Cookie 預設選項
const DEFAULT_OPTIONS: CookieOptions = {
  path: "/",
  secure: true, // 使用 HTTPS 時必須為 true
  sameSite: "none", // 跨域請求需要設置為 none
  domain: isProd ? "onrender.com" : undefined, // 修改為主域名
};

// 設定cookie
export function SET_COOKIE(value: string) {
  Cookies.set("GT_ACCESS_TOKEN", value, DEFAULT_OPTIONS);
}

export function GET_COOKIE(key: string = "GT_ACCESS_TOKEN") {
  return Cookies.get(key);
}

export function REMOVE_COOKIE(key: string = "GT_ACCESS_TOKEN") {
  Cookies.remove(key, DEFAULT_OPTIONS);
}

export function EXISTS_COOKIE(key: string = "GT_ACCESS_TOKEN") {
  return !!Cookies.get(key);
}
