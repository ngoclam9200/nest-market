import "./DealItem.scss";
import Banner5 from "../../../../assets/images/banner-5.png";
import RatingProduct from "../../../../components/share/rating-product/rating-product";
import ManufacturerProduct from "../../../../components/share/manufacture-product/manufacture-product";
import PriceProduct from "../../../../components/share/price-product/price-product";
import ButtonAddCart from "../../../../components/share/button-add-cart/button-add-cart";

const DealItem = () => {
  return (
    <>
      <div className="col-xl-3 col-lg-4 col-md-6 d-xl-block" style={{ padding: "12px" }}>
        <div className="product-cart-wrap style-2   deal-item">
          <div className="product-img-action-wrap">
            <div className="product-img">
              <a>
                <img src={Banner5} alt="" />
              </a>
            </div>
          </div>
          <div className="product-content-wrap">
            <div className="deals-countdown-wrap">
              <div className="deals-countdown">
                <span className="countdown-section">
                  <span className="countdown-amount hover-up">231</span>
                  <span className="countdown-period"> days </span>
                </span>
                <span className="countdown-section">
                  <span className="countdown-amount hover-up">09</span>
                  <span className="countdown-period"> hours </span>
                </span>
                <span className="countdown-section">
                  <span className="countdown-amount hover-up">37</span>
                  <span className="countdown-period"> mins </span>
                </span>
                <span className="countdown-section">
                  <span className="countdown-amount hover-up">17</span>
                  <span className="countdown-period"> sec </span>
                </span>
              </div>
            </div>
            <div className="deals-content">
              <h2>
                <a>Seeds of Change Organic Quinoa, Brown, &amp; Red Rice</a>
              </h2>
              <RatingProduct></RatingProduct>
              <ManufacturerProduct></ManufacturerProduct>
              <PriceProduct></PriceProduct>
              <ButtonAddCart></ButtonAddCart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealItem;
