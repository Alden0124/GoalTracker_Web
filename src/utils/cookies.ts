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
  secure: true,
  sameSite: "lax",
  expires: 7,
};
export function SET_COOKIE(value: string) {
  try {
    // 根據環境決定使用的選項
    const options = {
      ...DEFAULT_OPTIONS,
      // 如果需要跨域，則使用這些設置
      ...(isProd && {
        secure: true,
        sameSite: 'none'
      })
    };

    REMOVE_COOKIE();
    console.log('準備設置 cookie，選項：', options);
    Cookies.set("GT_ACCESS_TOKEN", value, options);
    
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
