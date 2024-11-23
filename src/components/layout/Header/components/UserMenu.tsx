import { useRef, useEffect, useState } from "react";
import { IoPersonOutline, IoChevronDownOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/common/useAppReduxs";
import { selectUserProFile, signOut } from "@/stores/slice/userReducer";
import { FETCH_AUTH } from "@/services/api/auth";
import { handleSuccess } from "@/utils/sucessHandler";

const UserMenu = () => {
  const dispatch = useAppDispatch(); // 用於派發 Redux actions
  const useProFile = useAppSelector(selectUserProFile);
  const { t } = useTranslation(); // 用於國際化翻譯
  const navigate = useNavigate(); // 用於路由導航
  const location = useLocation(); // 獲取當前路徑
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制下拉選單的開關狀態
  const menuRef = useRef<HTMLDivElement>(null); // 用於獲取選單 DOM 元素的引用

  // 點擊選單外部時關閉選單的效果
  useEffect(() => {
    // 處理點擊事件的函數
    const handleClickOutside = (event: MouseEvent) => {
      // 如果點擊的位置不在選單內部，則關閉選單
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // 添加全局點擊事件監聽器
    document.addEventListener("mousedown", handleClickOutside);

    // 組件卸載時移除事件監聽器
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  const handleSignOut = async () => {
    try {
      await FETCH_AUTH.signOut();
      handleSuccess(null, "登出成功");
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      dispatch(signOut());
      navigate("/auth/signIn");
    }
  };

  // 判斷是否為當前頁面
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-12 flex items-center justify-center">
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 group"
        >
          <div className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
            {useProFile?.avatar !== "" ? (
              <img
                src={useProFile.avatar}
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <IoPersonOutline className="h-6 w-6" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 bg-gray-200 dark:bg-gray-700 rounded-full p-[2px] transform translate-x-1 translate-y-1">
            <IoChevronDownOutline
              className={`h-3 w-3 transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background-light dark:bg-background-dark py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            {/* 登出 */}
            <button
              onClick={() => {
                handleSignOut();
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-foreground-light dark:text-foreground-dark text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t("logout")}
            </button>

            {/* 個人資料 */}
            <button
              onClick={() => {
                navigate(`/profile/${useProFile.id}`);
                setIsMenuOpen(false);
              }}
              className={`
                block w-full px-4 py-2 text-sm text-left 
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${
                  isCurrentPath("/user/profile")
                    ? "text-foreground-lightBlue  bg-gray-50 dark:bg-gray-800"
                    : "text-foreground-light dark:text-foreground-dark"
                }
              `}
            >
              {t("profile")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
