import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/common/useAppReduxs";
import { selectIsAuthenticated, signOut } from "@/stores/slice/userReducer";
// alert
import { notification } from "@/utils/notification";
// hooks
import { useCurrentUser } from "@/hooks/profile/ProfileInfo/queries/useProfileProfileInfoQueries";
// cookies
import { GET_COOKIE } from "@/utils/cookies";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { isError, isLoading } = useCurrentUser();

  useEffect(() => {
    const token = GET_COOKIE();

    if (!token) {
      dispatch(signOut());
    }

    // 如果正在全局加載中，先不做任何路由判斷
    if (isLoading) return;

    // 1. 已登入不可訪問的頁面
    const authOnlyPaths = [
      "/auth/signIn",
      "/auth/signUp",
      "/auth/forget",
      "/auth/sendCode",
      "/auth/verifyCode",
      "/auth/resetPassword",
    ];

    // 2. 有登入沒登入都可以訪問的頁面
    const publicPaths = [
      "/",
      // ... 其他公開頁面
    ];

    // 3. 只有登入才能訪問的頁面
    const protectedPaths = [
      "/profile",
      // ... 其他需要登入的頁面
    ];

    // 檢查當前路徑屬於哪種類型
    const isAuthOnlyPath = authOnlyPaths.some((path) =>
      location.pathname.startsWith(path)
    );
    const isPublicPath = publicPaths.some((path) => location.pathname === path);
    const isProtectedPath = protectedPaths.some((path) =>
      location.pathname.startsWith(path)
    );
    const isProfileDetailPath = location.pathname.match(/^\/profile\/[^/]+$/);

    // 有 token 但獲取用戶資料失敗
    if (token && isError) {
      notification.error({
        title: "登入狀態已過期",
        text: "請重新登入",
      });
      navigate("/auth/signIn", { replace: true });
      return;
    }

    // 已登入用戶訪問 auth 頁面，重定向到首頁
    if (isAuthenticated && isAuthOnlyPath) {
      navigate("/", { replace: true });
      return;
    }

    // 未登入用戶訪問需要登入的頁面或個人資料頁面
    if (!isAuthenticated && (isProtectedPath || isProfileDetailPath)) {
      navigate("/auth/signIn", {
        // state: { from: location.pathname },
        replace: true,
      });
      return;
    }

    // 如果路徑不屬於任何已定義的類型，可以選擇重定向到首頁或顯示 404
    if (
      !isAuthOnlyPath &&
      !isPublicPath &&
      !isProtectedPath &&
      !isProfileDetailPath
    ) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isError, isLoading, location.pathname, navigate]);

  // 使用全局 loading 狀態
  if (isLoading) {
    return null; // 或者返回一個全局 loading 組件
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
