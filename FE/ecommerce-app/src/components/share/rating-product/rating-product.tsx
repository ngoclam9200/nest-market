import "./rating-product.scss";
import { Rating } from "@mui/material";
interface RatingProductProps {
  rating: number;
}
const RatingProduct = ({ rating }: RatingProductProps) => {
  return (
    <>
      <div className="product-rate-cover d-flex align-items-center">
        <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly />
        <span className="font-small ml-5 text-muted"> ({rating})</span>
      </div>
    </>
  );
};
export default RatingProduct;
