import "../header/header.scss";
import Logo from "../../assets/images/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import SelectDrop from "../selectDrop/select";
import { useEffect, useState } from "react";
import IconCompare from "../../assets/images/icon-compare.svg";
import IConHeart from "../../assets/images/icon-heart.svg";
import IconCart from "../../assets/images/icon-cart.svg";
import IconUser from "../../assets/images/icon-user.svg";
import NotifyCount from "./notify-count/NotifyCount";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PinDropIcon from "@mui/icons-material/PinDrop";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ClickAwayListener } from "@mui/material";
import Nav from "./nav/nav";
import Home from "../../pages/Home/Home";
import MenuIcon from "@mui/icons-material/Menu";
const Header = () => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [categories, setcategories] = useState([
    "All Categories",
    "Milks and Dairies",
    "Wines and Alcohol",
    "Clothing and Beauty",
    "Pet Foods and Toy",
    "Fast food",
    "Baking material",
    "Vegetables",
    "Fresh Seafood",
    "Noodles and Rice",
    "Ice cream",
  ]);


   const [scrolled, setScrolled] = useState(false);
   useEffect(() => {
     const handleScroll = () => {
       const scrollTop = window.scrollY || document.documentElement.scrollTop;
       if (scrollTop > 100) {
         setScrolled(true);
       } else {
         setScrolled(false);
       }
     };

     window.addEventListener("scroll", handleScroll);

     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);

  return (
    <>
      <header className={scrolled ? "stick-header" : ""}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-2 button-menu">
              <MenuIcon></MenuIcon>
            </div>
            <div className="col-sm-2 header-logo logo">
              <a className="d-flex justify-content-center">
                <img src={Logo} alt="" />
              </a>
            </div>
            <div className="col-sm-5 search-bar">
              <div className="headerSearch d-flex align-items-center">
                <div className="selectDrop cursor position-relative">
                  <SelectDrop data={categories} placeholder="All Categories" />
                </div>
                <div className="search">
                  <input type="text" placeholder="Search for item..." />
                  <SearchIcon className="searchIcon" />
                </div>
              </div>
            </div>
            <div className="col-sm-5 header-action-right">
              <ul className="list list-inline align-items-center d-flex m-0 justify-content-end">
                <li className="list-inline-item-icon d-flex">
                  <NotifyCount icon={IconCompare} count={1} text={"Compare"} />
                </li>
                <li className="list-inline-item-icon d-flex">
                  <NotifyCount icon={IConHeart} count={1} text={"WishList"} />
                </li>
                <li className="list-inline-item-icon d-flex">
                  <NotifyCount icon={IconCart} count={10} text={"Cart"} />
                </li>
                <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
                  <li
                    className="list-inline-item-icon d-flex "
                    onClick={() => setisOpenDropDown(!isOpenDropDown)}
                  >
                    <NotifyCount icon={IconUser} count={0} text={"Account"} />
                    {isOpenDropDown && (
                      <ul className="dropdownMenu">
                        <li onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                          <Button>
                            <PersonIcon></PersonIcon> My Account
                          </Button>
                        </li>
                        <li onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                          <Button>
                            <PinDropIcon></PinDropIcon> Order Tracking
                          </Button>
                        </li>
                        <li onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                          <Button>
                            <CardGiftcardIcon></CardGiftcardIcon>My Voucher
                          </Button>
                        </li>
                        <li onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                          <Button>
                            <FavoriteBorderIcon></FavoriteBorderIcon>My Wishlist
                          </Button>
                        </li>
                        <li onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                          <Button>
                            <SettingsIcon></SettingsIcon>Setting
                          </Button>
                        </li>
                        <li onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                          <Button>
                            <ExitToAppIcon></ExitToAppIcon>Sign out
                          </Button>
                        </li>
                      </ul>
                    )}
                  </li>
                </ClickAwayListener>
              </ul>
            </div>
            <div className="col-sm-2  header-action-right-2-icon">
              <div className="d-flex justify-content-end">
                <li className="list-inline-item-icon d-flex">
                  <NotifyCount icon={IConHeart} count={1} text={""} />
                </li>
                <li className="list-inline-item-icon d-flex">
                  <NotifyCount icon={IconCart} count={10} text={""} />
                </li>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Nav isScrolled={scrolled}></Nav>
    </>
  );
};
export default Header;
