import { BsHouse } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const MenuList = () => {
  // const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button">
          <BsHouse />
          Home
        </button>
        <button type="button">
          <BiUserCircle />
          Profile
        </button>
        <button type="button">
          <MdLogout />
          Logout
        </button>
      </div>
    </div>
  );
};

export default MenuList;
