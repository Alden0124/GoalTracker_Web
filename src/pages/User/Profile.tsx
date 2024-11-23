import Wrapper from "@/components/common/Wrapper";
import { useAppSelector } from "@/hooks/common/useAppReduxs";
import { selectUserProFile } from "@/stores/slice/userReducer";
import { IoPersonOutline } from "react-icons/io5";
import GoalList from "@/components/common/GoalList";

const Profile = () => {
  const { avatar, username, email } = useAppSelector(selectUserProFile);

  const goals = [
    {
      title: "學習React Native",
      progress: 75,
      description: "開發跨平台移動應用",
    },
    {
      title: "每週運動3次",
      progress: 60,
      description: "保持身體健康",
    },
    {
      title: "閱讀10本技術書籍",
      progress: 40,
      description: "提高專業知識",
    },
  ];

  return (
    <div className="md:min-h-[calc(100vh-64px)] bg-background-secondaryLight dark:bg-background-secondaryDark  ">
      <div className="  flex flex-col items-center py-[20px] px-[10px] gap-[30px] max-w-[1200px] md:flex-row m-[0_auto] md:items-start">
        <Wrapper className="md:w-[40%] md:min-h-[550px]">
          <div className=" flex flex-col justify-center items-center gap-[10px]  ">
            {/* 使用者頭像 */}
            {avatar !== "" ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-[100px] h-[100px] rounded-full "
              />
            ) : (
              <div className="w-[100px] h-[100px] rounded-full dark:text-[#fff] bg-gray-200 flex justify-center items-center">
                <IoPersonOutline className="w-[50px] h-[50px] " />
              </div>
            )}

            {/* 使用者名稱 */}
            <div className="text-foreground-light dark:text-foreground-dark">
              {username === "" ? email : username}
            </div>

            {/* 如果不是自己個人主頁，則顯示關注按鈕、發送訊息按鈕 */}
            <div className="flex gap-[10px] w-full ">
              <button className="btn-primary w-full">關注</button>
              <button className="btn-secondary w-full">發送訊息</button>
            </div>

            {/* 如果是自己個人主頁，則顯示編輯按鈕 */}
            {/* <button className="btn-secondary w-full">編輯個人資料</button> */}

            {/* 如果是個人主頁，則顯示個人資料  */}
            <div className="flex flex-col mt-[20px] gap-[10px] w-full text-[#4B5563] dark:text-foreground-dark">
              <div className="">桃園市</div>
              <div className="">軟體工程師</div>
              <div className="">萬能科技大學</div>
            </div>

            {/* 粉絲數、追蹤者 */}
            <div className="flex justify-around mt-[20px]  w-full">
              <div className="">
                <p className="text-[30px] font-bold text-center dark:text-foreground-dark">
                  0
                </p>
                <p className="text-[#4B5563] text-center dark:text-foreground-dark">
                  粉絲數
                </p>
              </div>
              <div className="">
                <p className="text-[30px] font-bold text-center dark:text-foreground-dark">
                  0
                </p>
                <p className="text-[#4B5563] text-center dark:text-foreground-dark">
                  追蹤者
                </p>
              </div>
            </div>
          </div>
        </Wrapper>

        <div className="flex flex-col gap-[20px] w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-foreground-light dark:text-foreground-dark text-xl font-bold">
              目標
            </h2>
            <button className="btn-secondary">新增目標</button>
          </div>
          <GoalList goals={goals} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
