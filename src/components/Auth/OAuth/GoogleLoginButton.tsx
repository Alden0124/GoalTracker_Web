import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { notification } from "@/utils/notification";
import { FETCH_AUTH } from "@/services/api/auth";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center">
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
        type="standard"
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        locale="zh_TW"
      />
    </div>
  );
};

export default GoogleLoginButton;