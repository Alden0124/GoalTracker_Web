import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

// 環境變數判斷
// const isProd = process.env.NODE_ENV === "production";

// Cookie 預設選項
const DEFAULT_OPTIONS: CookieOptions = {
  path: "/",
  secure: true, // 使用 HTTPS 時必須為 true
  sameSite: "none", // 跨域請求需要設置為 none
};

// 設定cookie
export function SET_COOKIE(value: string) {
  try {
    Cookies.set("GT_ACCESS_TOKEN", value, DEFAULT_OPTIONS);
    
    // 驗證是否設置成功
    const savedCookie = Cookies.get("GT_ACCESS_TOKEN");
    if (!savedCookie) {
      console.warn("Cookie 設置失敗");
    } else {
      console.log("Cookie 設置成功");
    }
  } catch (error) {
    console.error("設置 Cookie 時發生錯誤:", error);
  }
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
