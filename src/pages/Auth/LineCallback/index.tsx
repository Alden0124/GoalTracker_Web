import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FETCH_AUTH } from "@/services/api/auth";
import { notification } from "@/utils/notification";
import { useSearchParams } from "react-router-dom";

const LineCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLineCallback = async () => {
      try {
        const code = searchParams.get("code");

        if (!code) {
          throw new Error("未取得授權碼");
        }

        // 調用後端 API
        await FETCH_AUTH.LineLogin({code});

        notification.success({
          title: "登入成功",
        });

        // 登入成功後導向首頁
        navigate("/");
      } catch (error) {
        console.error("LINE 登入失敗:", error);
        notification.error({
          title: "登入失敗",
          text: "LINE 登入處理失敗",
        });
        navigate("/signIn");
      }
    };

    handleLineCallback();
  }, [navigate, searchParams]);

  return <div>處理 LINE 登入中...</div>;
};

export default LineCallback;
