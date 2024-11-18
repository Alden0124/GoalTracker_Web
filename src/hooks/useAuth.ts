import { useNavigate } from "react-router-dom";
import { FETCH_AUTH } from "@/services/api/auth";
import { notification } from "@/utils/notification";

export const useAuth = () => {
  const navigate = useNavigate();

  const handleSendVerificationCode = async (email: string) => {
    try {
      const resp = await FETCH_AUTH["send-verification-code"]({ email });
      navigate(`/verifyCode?email=${email}`);
      notification.success({ title: "發送成功", text: resp.message });
    } catch (error: any) {
      const { errorMessage, status } = error;
      console.log(errorMessage, status)
      if (status === 400 && errorMessage === "此郵箱已驗證過") {
        notification.error({
          title: "驗證碼發送失敗",
          text: `${errorMessage}，請直接登入會員`,
        });
        navigate("/signIn");
      } else {
        notification.error({
          title: "驗證碼發送失敗",
          text: error.errorMessage,
        });
      }
    }
  };

  const handleVerifyCode = async (email: string, code: string) => {
    try {
      await FETCH_AUTH.VerifyCode({ email, code });
      notification.success({
        title: "驗證成功",
        text: "請再次登入",
      });
      navigate("/signIn");
    } catch (error: any) {
      notification.error({
        title: "驗證失敗",
        text: error.errorMessage,
      });
    }
  };

  return {
    handleSendVerificationCode,
    handleVerifyCode,
  };
};
