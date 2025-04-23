import "./product-item.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ButtonAddCart from "../share/button-add-cart/button-add-cart";
import { domainMedia } from "../../enums/Enum";
import RatingProduct from "../share/rating-product/rating-product";
import { ProductResponse } from "../../response/product";
import ManufacturerProduct from "../share/manufacture-product/manufacture-product";
import PriceProduct from "../share/price-product/price-product";
import { useCookies } from "react-cookie";
import Toast from "../share/toast/Toast";
import { useAppSelector } from "../../store/store";

interface ProductItemProps {
  product: ProductResponse;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [cookies, setCookie] = useCookies(["compareProducts"]);

 const handleCompareClick = () => {
   const isProductInCompare = itemCompare.some((p) => p && p.id === product.id);

   if (!isProductInCompare) {
     // Create a simplified product object with only necessary properties
     const simplifiedProduct = {
       id: product.id,
       name: product.name,
       price: product.price,
       original_price: product.original_price,
       discount: product.discount,
       media_default: product.media_default,
       category: product.category,
       brand: product.brand,
       rating: product.rating,
       stock: product.stock,
       quantity: product.quantity,
       description: product.description,
       origin: product.origin,
       storage_instructions: product.storage_instructions,
       expiry_date: product.expiry_date,
       unit: product.unit,
     };

     // Dispatch action to add product to compare list
     dispatch(addToCompare(simplifiedProduct));
     Toast.ToastSuccess("Sản phẩm đã được thêm vào danh sách so sánh");
   } else {
     Toast.ToastWarning("Sản phẩm đã có trong danh sách so sánh");
   }
 };



  return (
    <>
      {product && (
        <div className="product-cart-wrap mb-30" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div className="product-img-action-wrap">
            <div className="product-img product-img-zoom h-[150px]">
              <a>
                <img className="default-img" src={domainMedia + product?.media[0]?.url} alt="" />
                <img className="hover-img" src={domainMedia + product?.media[1]?.url} alt="" />
              </a>
            </div>
            <div className="product-action-1 flex">
              <a aria-label="Add To Wishlist" className="action-btn flex items-center">
                <FavoriteBorderIcon className="w-full"></FavoriteBorderIcon>
              </a>
              <a aria-label="Compare" className="action-btn flex items-center" onClick={handleCompareClick}>
                <CompareArrowsIcon className="w-full"></CompareArrowsIcon>
              </a>
              <a aria-label="Quick view" className="action-btn flex items-center" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                <VisibilityIcon className="w-full"></VisibilityIcon>
              </a>
            </div>
            {product.discount > 0 && (
              <div className="product-badges product-badges-position product-badges-mrg">
                <span className="hot">-{product.discount}%</span>
              </div>
            )}
          </div>
          <div className="product-content-wrap" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <div className="product-category">
              <a>{product.category.name ? product.category.name : " Chưa có danh mục"}</a>
            </div>
            <h2 style={{ minHeight: "48px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}>
              <a>{product.name}</a>
            </h2>
            <RatingProduct rating={product.rating}></RatingProduct>
            {product && (
              <div className="sold">
                <Box
                  sx={{
                    width: "100%",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#3bb77e" },
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      "& .MuiLinearProgress-bar": { backgroundColor: "#3bb77e" },
                    }}
                    value={product.quantity ? (product.stock / product.quantity) * 100 : 0}
                  />
                </Box>
                <p className="text-xs">
                  Sold: {product.stock}/{product.quantity}
                </p>
              </div>
            )}
            <div style={{ marginTop: "" }}>
              <ManufacturerProduct></ManufacturerProduct>
              <PriceProduct product={product}></PriceProduct>
              <ButtonAddCart product={product}></ButtonAddCart>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
