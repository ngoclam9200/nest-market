import "./nav.scss";
import { Button, ClickAwayListener } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, useNavigate } from "react-router-dom";
import MegaMenu from "./mega-menu/mega-menu";
import React, { useEffect, useState } from "react";
import { CategoryResponse } from "../../../response/category";
import { isSuccess } from "../../../services/base-response";
import { CategoryService } from "../../../services/category/category-service";
import { domainMedia } from "../../../enums/Enum";
import { useAppSelector } from "../../../store/store";
import NotifyCount from "../notify-count/NotifyCount";
import IconCompare from "../../../assets/images/icon-compare.svg";
import IConHeart from "../../../assets/images/icon-heart.svg";
import IconCart from "../../../assets/images/icon-cart.svg";

interface isScrollProp {
  isScrolled: boolean;
}
const Nav: React.FC<isScrollProp> = ({ isScrolled }) => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const { fetch: getListParentCategory, response: resListParentCategory } = CategoryService.getListParentCategory();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const navigation = useNavigate();
  const { totalItemCarts } = useAppSelector((state) => state.cart);
  const { itemsCompare } = useAppSelector((state) => state.compare);
  useEffect(() => {
    getListParentCategory({ status: 1 });
  }, []);
  useEffect(() => {
    if (resListParentCategory) {
      if (isSuccess(resListParentCategory)) {
        setCategories(resListParentCategory.data);
      }
    }
  }, [resListParentCategory]);
  return (
    <>
      <div className={`nav nav-container ${isScrolled ? "stick-nav" : ""}`}>
        <div className="w-full px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 part1 flex items-center">
              <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
                <li className="list-inline-item-icon flex relative" onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                  <Button className="bg-g text-white catTab flex items-center">
                    <GridViewIcon></GridViewIcon>
                    &nbsp;Tất cả danh mục &nbsp;
                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                  </Button>
                  {isOpenDropDown && (
                    <ul className="dropdownMenu absolute top-[60px] z-2 left-0 w-[500px]  bg-white shadow-lg shadow">
                      <li onClick={() => setisOpenDropDown(!isOpenDropDown)} className="p-4 grid grid-cols-2 gap-3">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center gap-2">
                            <img src={domainMedia + category?.media?.url} className="w-10 h-10" alt="" />
                            <p className="text-sm w-auto"> {category.name}</p>
                          </div>
                        ))}
                      </li>
                    </ul>
                  )}
                </li>
              </ClickAwayListener>
            </div>
            <div className="w-full md:w-7/12 part2 p-0 flex items-center">
              <nav>
                <ul className="list list-inline mb-0">
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="home" className={({ isActive }) => (isActive ? "active" : "")}>
                        Trang chủ
                        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                      </NavLink>
                    </Button>
                  </li>

                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="shop">Sản phẩm</NavLink>
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </Button>
                  </li>
                  <li className="list-inline-item position-static">
                    <Button>
                      <NavLink to="mega-menu">Danh mục</NavLink>
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </Button>
                    <MegaMenu></MegaMenu>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="deals">Khuyến mãi</NavLink>
                    </Button>
                  </li>

                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="blogs">Blogs</NavLink>
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="about">Về chúng tôi</NavLink>
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="contact">Liên hệ</NavLink>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-full md:w-1/6 part3 flex items-center p-0 justify-end">
              {/* <div className="hotline flex items-center">
                <HeadsetMicOutlinedIcon></HeadsetMicOutlinedIcon>
                <p className="flex flex-col mb-0">
                  <span className="phone-number">0364681528</span>
                  <span className="text-support">Hỗ trợ 24/7</span>
                </p>
              </div> */}
              <div className="col-sm-5 header-action-right">
                <ul className="list list-inline align-items-center d-flex m-0 justify-content-end gap-2">
                  <li
                    className="list-inline-item-icon d-flex"
                    onClick={() => {
                      navigation("/compare");
                    }}
                  >
                    <NotifyCount icon={IconCompare} count={itemsCompare.length} text={""} />
                  </li>
                  <li className="list-inline-item-icon d-flex">
                    <NotifyCount icon={IConHeart} count={1} text={""} />
                  </li>
                  <li
                    className="list-inline-item-icon d-flex"
                    onClick={() => {
                      navigation("/cart");
                    }}
                  >
                    <NotifyCount icon={IconCart} count={totalItemCarts} text={""} />
                  </li>
                  {/* <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
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
                  </ClickAwayListener> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
