import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 