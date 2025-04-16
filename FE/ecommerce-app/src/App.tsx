import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ListProduct from "./pages/ListProduct/ListProduct";
import NotFound from "./pages/NotFound/NotFound";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import CompareProduct from "./pages/CompareProduct/CompareProduct";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/share/Layout/Layout";
function App() {
  
  return (
    <>
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
      </BrowserRouter>
    </>
  );
}

export default App;
