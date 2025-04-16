import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../header/header";
import { ReactNode, useEffect } from "react";
import Login from "../../../page/Auth/login/login";
import { getCookie } from "../../../services/cookie";
import NavList from "../../nav/NavList";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/login"];
  const data_user = getCookie("data_user");
  const navigate = useNavigate();
  useEffect(() => {
    if (hideHeaderFooterRoutes.includes(location.pathname) || !data_user) {
      navigate("/login");
    }
  }, [location.pathname, data_user, navigate]);

  return (
    <>
      {hideHeaderFooterRoutes.includes(location.pathname) || !data_user ? (
        <Login />
      ) : (
        <>
          <NavList />
          <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
            {<Header />}
            {children}
          </main>
        </>
      )}
    </>
  );
};

export default Layout;
