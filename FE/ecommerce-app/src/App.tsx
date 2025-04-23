import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import About from "./pages/About/About";
import ListProduct from "./pages/list-product/list-product";
import NotFound from "./pages/not-found/not-found";
import DetailProduct from "./pages/product-detail/product-detail";
import CompareProduct from "./pages/compare-product/compare-product";
import Cart from "./pages/shopping-cart/shopping-cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/share/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/product" element={<ListProduct />}></Route>
                <Route path="/product/:productId" element={<DetailProduct />} />
                <Route path="/compare" element={<CompareProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Layout>
            <ToastContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
