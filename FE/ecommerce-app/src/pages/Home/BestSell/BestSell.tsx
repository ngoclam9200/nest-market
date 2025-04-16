import "./BestSell.scss";
import Product from "../../../components/product/Product";
import Slider from "react-slick";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef } from "react";

const BestSell = () => {
  let sliderRef = useRef(null);
  const next = () => {
    (sliderRef as any).slickNext();
  };
  const previous = () => {
    (sliderRef as any).slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const sold = {
    stock: 45,
    count: 100,
  };

  return (
    <>
      <div className="container-fluid">
        <div className="title-best-sell">
          <h2>Daily Best Sells</h2>
        </div>
        <div className="tab-content">
          <div className="row">
            <div className="col-lg-3 d-lg-flex">
              <div className="best-sell-banner-img">
                <div className="banner-text">
                  <h2 className="mb-100">Bring nature into your home</h2>
                  <a className="btn btn-xs">
                    Shop Now
                    <ArrowForwardIcon></ArrowForwardIcon>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="button-arrow left">
                <ArrowBackIcon onClick={previous}></ArrowBackIcon>
              </div>
              <div className="button-arrow right">
                <ArrowForwardIcon onClick={next}></ArrowForwardIcon>
              </div>
              <Slider
                ref={(slider: any) => {
                  sliderRef = slider;
                }}
                {...settings}
              >
                <div>
                  <Product sold={sold}></Product>
                </div>
                <div>
                  <Product sold={sold}></Product>
                </div>
                <div>
                  <Product sold={sold}></Product>
                </div>
                <div>
                  <Product sold={sold}></Product>
                </div>
                <div>
                  <Product sold={sold}></Product>
                </div>
                <div>
                  <Product sold={sold}></Product>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BestSell;
