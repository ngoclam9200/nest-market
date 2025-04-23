import PriceProduct from "../../../../components/share/price-product/price-product";
import RatingProduct from "../../../../components/share/rating-product/rating-product";
import "./SmallProduct.scss";
const SmallProduct = () => {
  return (
    <>
      <article className="row align-items-center hover-up">
        <figure className="col-md-4 mb-0">
          <a>
            {/* <img src={Thumnail1} alt="" /> */}
          </a>
        </figure>
        <div className="col-md-8 mb-0">
          <h6>
            <a>Nestle Original Coffee-Mate Coffee Creamer</a>
          </h6>
          {/* <RatingProduct></RatingProduct>
          <PriceProduct></PriceProduct> */}
        </div>
      </article>
    </>
  );
};
export default SmallProduct;
