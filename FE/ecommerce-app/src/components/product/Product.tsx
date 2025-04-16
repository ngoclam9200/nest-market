import "./Product.scss";
import ProductImage1 from "../../assets/images/product/product-1-1.jpg";
import ProductImage2 from "../../assets/images/product/product-1-2.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import RatingProduct from "../share/RatingProduct/RatingProduct";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ManufacturerProduct from "../share/ManufacturerProduct/ManufacturerProduct";
import PriceProduct from "../share/PriceProduct/PriceProduct";
import ButtonAddCart from "../share/ButtonAddCart/ButtonAddCart";

interface Sold {
  stock: number;
  count: number;
}
interface ISoldProps {
  sold?: Sold;
}

const Product: React.FC<ISoldProps> = ({ sold }) => {
  return (
    <>
      <div className="product-cart-wrap mb-30 ">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            <a>
              <img className="default-img" src={ProductImage1} alt="" />
              <img className="hover-img" src={ProductImage2} alt="" />
            </a>
          </div>
          <div className="product-action-1 d-flex">
            <a
              aria-label="Add To Wishlist"
              className="action-btn d-flex align-items-center"
               
            >
              <FavoriteBorderIcon className="w-100"></FavoriteBorderIcon>
            </a>
            <a
              aria-label="Compare"
              className="action-btn d-flex align-items-center"
               
            >
              <CompareArrowsIcon className="w-100"></CompareArrowsIcon>
            </a>
            <a
              aria-label="Quick view"
              className="action-btn d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#quickViewModal"
            >
              <VisibilityIcon className="w-100"></VisibilityIcon>
            </a>
          </div>
          <div className="product-badges product-badges-position product-badges-mrg">
            <span className="hot">Hot</span>
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="product-category">
            <a>Snack</a>
          </div>
          <h2>
            <a>Seeds of Change Organic Quinoa, Brown, &amp; Red Rice</a>
          </h2>
          <RatingProduct></RatingProduct>
          {sold && (
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
                  value={(sold.stock / sold.count) * 100}
                />
              </Box>
              <p style={{ fontSize: "13px" }}>
                Sold: {sold.stock}/{sold.count}
              </p>
            </div>
          )}
          <ManufacturerProduct></ManufacturerProduct>
          <PriceProduct></PriceProduct>
          <ButtonAddCart></ButtonAddCart>
        </div>
      </div>
    </>
  );
};

export default Product;
