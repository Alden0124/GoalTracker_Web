// icon
import { AiOutlineGlobal } from "react-icons/ai";
import { CiDark } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
// i18n
import { useTranslation } from "react-i18next";
// 自訂一hook
import { useTheme } from "@/hooks/useTheme";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header
      className={`
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
        >
          <AiOutlineGlobal />
        </button>
        <button
          onClick={toggleTheme}
          className=" flex md:w-12 md:h-12 rounded-full items-center justify-center hover:opacity-80 dark:hover:bg-foreground-darkHover"
        >
          {theme === "dark" ? <IoSunnyOutline /> : <CiDark />}
        </button>
        <button className={`btn-primary ml-[15px]`}>{t("login")}</button>
      </div>
    </header>
  );
};

export default Header;
