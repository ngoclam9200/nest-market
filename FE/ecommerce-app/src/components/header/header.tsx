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
import MenuIcon from "@mui/icons-material/Menu";
import { CategoryService } from "../../services/category/category-service";
import { isSuccess } from "../../services/base-response";
import { CategoryResponse } from "../../response/category";
import { useAppSelector } from "../../store/store";
const Header = () => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const { fetch: getListParentCategory, response: resListParentCategory } = CategoryService.getListParentCategory();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
   const { totalItemCarts } = useAppSelector((state) => state.cart);
    const { totalItemCompare } = useAppSelector((state) => state.compare);

  useEffect(() => {
    getListParentCategory({ status: 1 });
  }, []);
  useEffect(() => {
    if (resListParentCategory) {
      if (isSuccess(resListParentCategory)) {
        setCategories([{ id: -1, name: "Tất cả danh mục" } as CategoryResponse, ...resListParentCategory.data]);
      }
    }
  }, [resListParentCategory]);

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
                  <SelectDrop isAll={true} data={categories} placeholder="Tất cả danh mục" />
                </div>
                <div className="search">
                  <input type="text" placeholder="Tìm kiếm sản phẩm" />
                  <SearchIcon className="searchIcon" />
                </div>
              </div>
            </div>
            <div className="col-sm-5 header-action-right">
              <ul className="list list-inline align-items-center d-flex m-0 justify-content-end gap-2">
                <li className="list-inline-item-icon d-flex">
                  <NotifyCount icon={IconCompare} count={totalItemCompare} text={"So sánh"} />
                </li>
                <li className="list-inline-item-icon d-flex">
                  <NotifyCount icon={IConHeart} count={1} text={"Yêu thích"} />
                </li>
                <li className="list-inline-item-icon d-flex">
                  <NotifyCount icon={IconCart} count={totalItemCarts} text={"Giỏ hàng"} />
                </li>
                <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
                  <li className="list-inline-item-icon d-flex " onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                    <NotifyCount icon={IconUser} count={0} text={"Account"} />
                    {isOpenDropDown && (
                      <ul className="dropdownMenu">
                        <li onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                          <Button>
                            <PersonIcon></PersonIcon> Tài khoản
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
