import Link from "next/link";
import { useState } from "react";
import Icon from "../Icon";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="fixed top-0 flex h-14 w-full items-center justify-between shadow-sm">
      <div className="cursor-pointer px-4 text-lg font-semibold text-blue-800">
        nextmap
      </div>
      <div className="flex items-center gap-3 px-4">
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
