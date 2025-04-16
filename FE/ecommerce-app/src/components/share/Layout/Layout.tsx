import { useLocation } from "react-router-dom";
import Header from "../../header/header";
import Footer from "../../Footer/Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/login", "/register"];

  return (
    <>
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Header />}
      {children}
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default Layout;
