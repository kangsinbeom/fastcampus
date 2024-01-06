import { ReactNode } from "react";
import MenuList from "./home/MenuList";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="layout">
        {children}
        <MenuList />
      </div>
    </>
  );
};

export default Layout;
