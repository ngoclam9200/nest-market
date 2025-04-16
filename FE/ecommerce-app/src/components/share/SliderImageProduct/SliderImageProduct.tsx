import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Cate1 from "../../../assets/images/category/cat-1.png";
import Cate2 from "../../../assets/images/category/cat-2.png";
import Cate3 from "../../../assets/images/category/cat-3.png";
import Cate4 from "../../../assets/images/category/cat-4.png";
import Cate5 from "../../../assets/images/category/cat-5.png";
import "./SliderImageProduct.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const SliderImageProduct: React.FC = () => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  let sliderRef1 = useRef<Slider | null>(null);
  let sliderRef2 = useRef<Slider | null>(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const next = () => {
    (sliderRef1 as any).slickNext();
  };
  const previous = () => {
    (sliderRef1 as any).slickPrev();
  };
  // Cấu hình cho slider 4 ảnh
  const slider1Settings = {
    asNavFor: nav2 || undefined,
    ref: sliderRef1,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  // Cấu hình cho slider 1 ảnh
  const slider2Settings = {
    asNavFor: nav1 || undefined,
    ref: sliderRef2,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  return (
    <>
      <div className="product-image-slider">
        <Slider {...slider2Settings} ref={sliderRef2}>
          <div className="d-flex justify-content-center align-items-center item-img ">
            <InnerImageZoom
              hideHint={true}
              zoomType="hover"
              zoomScale={2}
              src={Cate1}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center item-img">
            <InnerImageZoom
              hideHint={true}
              zoomType="hover"
              zoomScale={2}
              src={Cate2}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center item-img">
            <InnerImageZoom
              hideHint={true}
              zoomType="hover"
              zoomScale={2}
              src={Cate3}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center item-img">
            <InnerImageZoom
              hideHint={true}
              zoomType="hover"
              zoomScale={2}
              src={Cate4}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center item-img">
            <InnerImageZoom
              hideHint={true}
              zoomType="hover"
              zoomScale={2}
              src={Cate5}
            />
          </div>
        </Slider>
      </div>
      <div className="slider-nav-thumbnails">
        <div className="button-arrow button-slider left">
          <ArrowBackIcon className="mb-0" onClick={previous}></ArrowBackIcon>
        </div>
        <div className="button-arrow button-slider right">
          <ArrowForwardIcon className="mb-0" onClick={next}></ArrowForwardIcon>
        </div>
        <Slider {...slider1Settings} ref={sliderRef1}>
          <div className="item">
            <img src={Cate1} alt="1" />
          </div>
          <div>
            <img src={Cate2} alt="2" />
          </div>
          <div>
            <img src={Cate3} alt="3" />
          </div>
          <div>
            <img src={Cate4} alt="4" />
          </div>
          <div>
            <img src={Cate5} alt="5" />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default SliderImageProduct;
