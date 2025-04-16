import "./HomeSlider.scss";
import Slider from "react-slick";
import SliderImage1 from "../../../assets/images/slider-1.png";
import SliderImage2 from "../../../assets/images/slider-2.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef } from "react";
import FormSendEmail from "../../../components/share/FormSendEmail/FormSendEmail";
const HomeSlider = () => {
  let sliderRef = useRef(null);
  const next = () => {
    (sliderRef as any).slickNext();
  };
  const previous = () => {
    (sliderRef as any).slickPrev();
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <section className="home-slider">
        <div className="container-fluid ">
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
            <div className="item">
              <img src={SliderImage1} className="w-100"></img>
              <div className="slider-content">
                <h1 className="display-2 mb-40">
                  Don’t miss amazing
                  <br />
                  grocery deals
                </h1>
                <p className="mb-65">Sign up for the daily newsletter</p>
                <FormSendEmail></FormSendEmail>
              </div>
            </div>
            <div className="item">
              <img src={SliderImage2} className="w-100"></img>
              <div className="slider-content">
                <h1 className="display-2 mb-40">
                  Fresh Vegetables
                  <br />
                  Big discount
                </h1>
                <p className="mb-65">Save up to 50% off on your first order</p>
                <FormSendEmail></FormSendEmail>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
};
export default HomeSlider;
