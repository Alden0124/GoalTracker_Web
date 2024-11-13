import { useState } from "react";
// icon
import { AiOutlineGlobal } from "react-icons/ai";
import { CiDark } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";

const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  const isOpenNavHandler = () => {
    setIsOpenNav((prevState) => !prevState);
  };

  return (
    <>
      <header
        className={`py-[12px] px-[16px] flex justify-between items-center border-b  shadow-sm `}
      >
        <p className={`text-[18px]`}>GoalTracker</p>
        <div className={`flex items-center gap-[16px] text-[16px]`}>
          <AiOutlineGlobal />
          <IoSunnyOutline />
          <CiDark />
          <div className={` `}>登入</div>
        </div>
      </header>
    </>
  );
};

export default Header;
