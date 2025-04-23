import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./slider-image-product.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { MediaResponse } from "../../../response/media";
import { domainMedia } from "../../../enums/Enum";

interface SliderImageProductProps {
  images: MediaResponse[];
}

const SliderImageProduct: React.FC<SliderImageProductProps> = ({ images }) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  let sliderRef1 = useRef<Slider | null>(null);
  let sliderRef2 = useRef<Slider | null>(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const next = () => {
    if (sliderRef1.current) {
      sliderRef1.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef1.current) {
      sliderRef1.current.slickPrev();
    }
  };

  // Cấu hình cho slider 4 ảnh
  const slider1Settings = {
    asNavFor: nav2 || undefined,
    ref: sliderRef1,
    slidesToShow: images.length,
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
          {images.map((image, index) => (
            // <div key={index} className="d-flex justify-content-center align-items-center item-img w-full h-full">
              <InnerImageZoom hideHint={true} zoomType="click" src={domainMedia + image.url} className="w-full h-full flex content-center items-center" />
            // </div>
          ))}
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
          {images.map((image, index) => (
            <div key={index} className="item">
              <img src={domainMedia + image.url} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SliderImageProduct;
