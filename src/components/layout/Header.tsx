import { useNavigate } from "react-router-dom";
// icon
import { AiOutlineGlobal } from "react-icons/ai";
import { CiDark } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
// i18n
import { useTranslation } from "react-i18next";
// 自訂一hook
import { useTheme } from "@/hooks/style/useTheme";
import { Link } from "react-router-dom";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/common/useAppReduxs";
import { selectIsAuthenticated, signOut } from "@/stores/slice/userReducer";
// api
import { FETCH_AUTH } from "@/services/api/auth";
// utils
import { handleSuccess } from "@/utils/sucessHandler";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const isLogin = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      await FETCH_AUTH.signOut();
      handleSuccess(null, "登出成功");
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      dispatch(signOut());
      navigate("/auth/signIn");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en-US" ? "zh-TW" : "en-US";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <header
      className={`
        h-[64px]
        py-[8px] px-[15px] md:px-[30px] 
        sticky top-0 
        flex justify-between items-center 
        border-b 
        shadow-sm 
        bg-background-light dark:bg-background-dark 
        text-foreground-light dark:text-foreground-dark
      `}
    >
      <p className="text-[18px]">GoalTracker</p>
      <div className="flex items-center text-[16px] gap-[10px]">
        <button
          onClick={toggleLanguage}
          className="flex w-12 h-12 rounded-full items-center justify-center hover:opacity-80 dark:hover:bg-foreground-darkHover"
          aria-label={t("changeLanguage")}
        >
          <AiOutlineGlobal />
          <span className="sr-only">{i18n.language === "zh-TW" ? "EN" : "中"}</span>
        </button>
        <button
          onClick={toggleTheme}
          className=" flex md:w-12 md:h-12 rounded-full items-center justify-center hover:opacity-80 dark:hover:bg-foreground-darkHover"
        >
          {theme === "dark" ? <IoSunnyOutline /> : <CiDark />}
        </button>
        {isLogin ? (
          <button onClick={handleSignOut} className={`btn-primary ml-[15px]`}>
            {t("logout")}
          </button>
        ) : (
          <Link to={"/auth/signIn"} className={`btn-primary ml-[15px]`}>
            {t("login")}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
