import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/common/useAppReduxs";
import { selectIsAuthenticated } from "@/stores/slice/userReducer";
import { notification } from "@/utils/notification";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

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

    if (isAuthenticated && location.pathname.startsWith("/auth")) {
      navigate("/home", { replace: true });
      return;
    }

    if (!isPublicPath && !isAuthenticated) {
      notification.warning({
        title: "請先登入",
        text: "您需要登入才能訪問此頁面",
      });
      navigate("/auth/signIn");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return children || <Outlet />;
};

export default ProtectedRoute;
