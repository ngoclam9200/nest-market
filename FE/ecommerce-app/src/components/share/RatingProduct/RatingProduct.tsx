import "./RatingProduct.scss";
import { Rating } from "@mui/material";

const RatingProduct = () => {
  return (
    <>
      <div className="product-rate-cover d-flex align-items-center">
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
        <span className="font-small ml-5 text-muted"> (4.0)</span>
      </div>
    </>
  );
};
export default RatingProduct;
