import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import NavItem from "./NavItem";
import ImageIcon from "@mui/icons-material/Image";

const NavList = () => {
  return (
    <>
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y bg-white" id="sidenav-main">
        <div className="sidenav-header">
          <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          <a className="navbar-brand m-0" href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html" target="_blank">
            <img src="./src/assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
            <span className="ms-1 font-weight-bold">Soft UI Dashboard</span>
          </a>
        </div>
        <hr className="horizontal dark mt-0" />
        <div className="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <NavItem url="/dashboard" title="Trang chủ" Icon={HomeIcon} />
            <NavItem url="/category" title="Danh mục " Icon={CategoryIcon} />
            <NavItem url="/product" title="Sản phẩm" Icon={Inventory2Icon} />
            <NavItem url="/banner" title="Banner" Icon={ImageIcon} />
            <NavItem url="/login" title="Log out" Icon={LogoutIcon} />
          </ul>
        </div>
        {/* <div className="sidenav-footer mx-3 ">
          <div className="card card-background shadow-none card-background-mask-secondary" id="sidenavCard">
            <div
              className="full-background"
              style={{
                backgroundImage: "url('../assets/img/curved-images/white-curved.jpeg')",
              }}
            ></div>
            <div className="card-body text-start p-3 w-100">
              <div className="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
                <i className="ni ni-diamond text-dark text-gradient text-lg top-0" aria-hidden="true" id="sidenavCardIcon"></i>
              </div>
              <div className="docs-info">
                <h6 className="text-white up mb-0">Need help?</h6>
                <p className="text-xs font-weight-bold">Please check our docs</p>
                <a href="https://www.creative-tim.com/learning-lab/bootstrap/license/soft-ui-dashboard" target="_blank" className="btn btn-white btn-sm w-100 mb-0">
                  Documentation
                </a>
              </div>
            </div>
          </div>
          <a className="btn bg-gradient-primary mt-4 w-100" href="https://www.creative-tim.com/product/soft-ui-dashboard-pro?ref=sidebarfree" type="button">
            Upgrade to pro
          </a>
        </div> */}
      </aside>
    </>
  );
};

export default NavList;
