import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/share/Layout/Layout";
import ProtectedRoute from "./page/Auth/protected-route";
import CategoryList from "./page/Category/category-list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "./page/Product/product-list";
import "./assets/styles.scss"
import Home from "./page/Home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />} />
              <Route path="/category" element={<CategoryList />}>
                <Route path=":parentNameCategory" element={<CategoryList />} />
              </Route>
            </Route>
            <Route path="/product" element={<ProductList />} />
          </Routes>
        </Layout>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
