import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const isProd = window.location.hostname !== "localhost";

const DEFAULT_OPTIONS: CookieOptions = {
  path: "/",
  secure: isProd,
  sameSite: "none",  // 統一使用 'none' 以支援跨域
  expires: 7,  // 7天
  domain: isProd ? 'goaltracker-admin.onrender.com' : undefined  // 使用完整域名
};
export function SET_COOKIE(value: string) {
  try {
    // 先清除可能存在的舊 cookie
    REMOVE_COOKIE();
    
    // 設置新的 cookie，添加調試信息
    console.log('準備設置 cookie，選項：', DEFAULT_OPTIONS);
    Cookies.set("GT_ACCESS_TOKEN", value, DEFAULT_OPTIONS);
    
    // 驗證是否設置成功
    const savedCookie = Cookies.get("GT_ACCESS_TOKEN");
    if (!savedCookie) {
      console.warn("Cookie 設置失敗，使用 localStorage 作為備用");
      localStorage.setItem("GT_ACCESS_TOKEN", value);
    } else {
      console.log("Cookie 設置成功:", savedCookie);
    }
  } catch (error) {
    console.error("設置 Cookie 時發生錯誤:", error);
    localStorage.setItem("GT_ACCESS_TOKEN", value);
  }
}

export function GET_COOKIE(key: string = "GT_ACCESS_TOKEN") {
  return Cookies.get(key) || localStorage.getItem(key);
}

export function REMOVE_COOKIE(key: string = "GT_ACCESS_TOKEN") {
  Cookies.remove(key, DEFAULT_OPTIONS);
  localStorage.removeItem(key);
}

export function EXISTS_COOKIE(key: string = "GT_ACCESS_TOKEN") {
  return !!Cookies.get(key);
}
