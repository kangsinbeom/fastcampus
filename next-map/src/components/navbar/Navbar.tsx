import Link from "next/link";
import { useState } from "react";
import Icon from "../Icon";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-between fixed w-full h-14 items-center top-0 shadow-sm">
      <div className="font-semibold text-lg cursor-pointer text-blue-800 px-4">
        nextmap
      </div>
      <div className="flex px-4 gap-3 items-center">
        <NavbarItem url="/stores" title="맛집 목록" />
        <NavbarItem url="/stores/new" title="맛집 등록" />
        <NavbarItem url="/users/likes" title="찜한 가게" />
        <NavbarItem url="/users/login" title="로그인" />
      </div>
      {/* mobile button */}
      <div role="presentation" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? (
          <Icon iconName="AiOutlineClose" />
        ) : (
          <Icon iconName="BiMenu" />
        )}
      </div>
      {/* mobile navbar */}
      {isOpen && (
        <div>
          <Link href={"/stores"}>맛집 목록</Link>
          <Link href={"/stores/new"}>맛집 등록</Link>
          <Link href={"/users/likes"}>찜한가게</Link>
          <Link href={"/users/login"}>로그인</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
