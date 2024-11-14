import { useTranslation } from "react-i18next";
import { AiOutlineGlobal } from "react-icons/ai";
import { CiDark } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
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
        py-[12px] px-[16px] 
        sticky top-0 
        flex justify-between items-center 
        border-b 
        shadow-sm 
        bg-background-light dark:bg-background-dark 
        text-foreground-light dark:text-foreground-dark
      `}
    >
      <p className="text-[18px]">{t("goalTracker")}</p>
      <div className="flex items-center gap-[16px] text-[16px]">
        <button 
          onClick={toggleLanguage}
          className="hover:opacity-80"
        >
          <AiOutlineGlobal />
        </button>
        <button 
          onClick={toggleTheme}
          className="hover:opacity-80"
        >
          {theme === "dark" ? <IoSunnyOutline /> : <CiDark />}
        </button>
        <div>{t("login")}</div>
      </div>
    </header>
  );
};

export default Header;
