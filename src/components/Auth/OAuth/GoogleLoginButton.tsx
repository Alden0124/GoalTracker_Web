import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react'
import { notification } from "@/utils/notification";
import { FETCH_AUTH } from "@/services/api/auth";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCustomButtonClick = () => {
    // 程式觸發隱藏的 Google 按鈕點擊
    const googleButton = buttonRef.current?.querySelector('div[role="button"]');
    if (googleButton) {
      (googleButton as HTMLElement).click();
    }
  };

  return (
    <div className="w-full">
      {/* 隱藏的 Google 登入按鈕 */}
      <div ref={buttonRef} className="hidden">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              FETCH_AUTH.GoogleLogin({
                token: credentialResponse.credential
              })
                .then((response) => {
                  notification.success({
                    title: "Google 登入成功",
                  });
                  localStorage.setItem('accessToken', response.accessToken);
                  navigate('/');
                })
                .catch((error) => {
                  notification.error({
                    title: "Google 登入失敗",
                    text: error instanceof Error ? error.message : '登入失敗'
                  });
                });
            }
          }}
          onError={() => {
            notification.error({
              title: "Google 登入失敗",
              text: "請稍後再試"
            });
          }}
          useOneTap={false}
          locale="zh_TW"
        />
      </div>

      {/* 自定義按鈕 */}
      <button
        type="button"
        onClick={handleCustomButtonClick}
        className="w-full border text-center text-[16px] rounded-[5px] hover:bg-[gray]/10 dark:text-foreground-dark dark:border-gray-600 p-[6px] flex items-center justify-center gap-2"
      >
        <FcGoogle size={24} />
        使用 Google 登入
      </button>
    </div>
  );
};

export default GoogleLoginButton;