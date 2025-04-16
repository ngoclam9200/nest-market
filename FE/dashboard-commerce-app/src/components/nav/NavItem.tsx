import { SvgIconComponent } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  url: string;
  title: string;
  Icon: SvgIconComponent;
}
const NavItem: React.FC<NavItemProps> = ({ url, title, Icon }) => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link active" to={url}>
          <Icon />
          <span className="nav-link-text ms-1">{title}</span>
        </Link>
      </li>
    </>
  );
};
export default NavItem;
