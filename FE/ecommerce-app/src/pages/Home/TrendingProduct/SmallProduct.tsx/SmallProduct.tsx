import PriceProduct from "../../../../components/share/PriceProduct/PriceProduct";
import RatingProduct from "../../../../components/share/RatingProduct/RatingProduct";
import "./SmallProduct.scss";
import Thumnail1 from "../../../../assets/images/product/thumbnail-1.jpg";
const SmallProduct = () => {
  return (
    <>
      <article className="row align-items-center hover-up">
        <figure className="col-md-4 mb-0">
          <a>
            <img src={Thumnail1} alt="" />
          </a>
        </figure>
        <div className="col-md-8 mb-0">
          <h6>
            <a>Nestle Original Coffee-Mate Coffee Creamer</a>
          </h6>
          <RatingProduct></RatingProduct>
          <PriceProduct></PriceProduct>
        </div>
      </article>
    </>
  );
};
export default SmallProduct;
