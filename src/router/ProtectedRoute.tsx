import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/common/useAppReduxs";
import { selectIsAuthenticated } from "@/stores/slice/userReducer";
import { notification } from "@/utils/notification";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { GET_COOKIE } from "@/utils/cookies";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { isError } = useUserProfile();
  
  useEffect(() => {
    const publicPaths = [
      "/auth/signIn",
      "/auth/signUp",
      "/auth/forget",
      "/auth/sendCode",
      "/auth/verifyCode",
      "/auth/resetPassword",
      "/home",
    ];

    const isPublicPath = publicPaths.some((path) =>
      location.pathname.startsWith(path)
    );

    const token = GET_COOKIE();

    // 有 token 但獲取用戶資料失敗
    if (token && isError) {
      notification.error({
        title: "登入狀態已過期",
        text: "請重新登入",
      });
      navigate("/auth/signIn", { replace: true });
      return;
    }

    // 已登入但訪問 auth 路徑
    if (isAuthenticated && location.pathname.startsWith("/auth")) {
      navigate("/home", { replace: true });
      return;
    }

    // 未登入且訪問需要驗證的路徑
    if (!isPublicPath && !isAuthenticated) {
      notification.warning({
        title: "請先登入",
        text: "您需要登入才能訪問此頁面",
      });
      navigate("/auth/signIn", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [isAuthenticated, isError, location.pathname, navigate]);

  return children || <Outlet />;
};

export default ProtectedRoute;
