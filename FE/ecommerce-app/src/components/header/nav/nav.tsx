import "./nav.scss";
import { Button } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import Dropdown from "./dropdown/dropdown";
import MegaMenu from "./mega-menu/mega-menu";
import React, { useEffect, useState } from "react";

interface isScrollProp{
  isScrolled:boolean
}
const Nav: React.FC<isScrollProp> = ({ isScrolled }) => {
  const items = [
    {
      title: "Item 1",
    },
    {
      title: "Item 2",
    },
    { title: "Item 3" },
  ];

  return (
    <>
      <div className={`nav nav-container ${isScrolled ? "stick-nav" : ""}`}>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-3 part1 d-flex align-items-center">
              <Button className="bg-g text-white catTab d-flex align-items-center">
                <GridViewIcon></GridViewIcon>
                &nbsp;Browse All Categories &nbsp;
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              </Button>
            </div>
            <div className="col-sm-7 part2 p-0 d-flex align-items-center">
              <nav>
                <ul className="list list-inline mb-0">
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="deals">Deals</NavLink>
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink
                        to="home"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Home
                        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                      </NavLink>
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="about">About</NavLink>
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="shop">Shop</NavLink>
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="vendors">Vendors</NavLink>
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </Button>
                  </li>
                  <li className="list-inline-item position-static ">
                    <Button>
                      <NavLink to="mega-menu">Mega menu</NavLink>
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </Button>
                    <MegaMenu></MegaMenu>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="blogs">Blogs</NavLink>
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </Button>
                  </li>
                  <li className="list-inline-item list-inline-item1">
                    <Button>
                      <NavLink to="page">Pages</NavLink>
                      <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </Button>
                    <Dropdown items={items} />
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <NavLink to="contact">Contact</NavLink>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-sm-2 part3 d-flex align-items-center p-0 justify-content-end">
              <div className="hotline d-flex align-items-center">
                <HeadsetMicOutlinedIcon></HeadsetMicOutlinedIcon>
                <p className="d-flex flex-column mb-0">
                  <span className="phone-number">1900 - 888</span>
                  <span className="text-support">24/7 Support Center</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
