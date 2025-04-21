import "./home-slider.scss";
import Slider from "react-slick";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import FormSendEmail from "../../../components/share/FormSendEmail/FormSendEmail";
import { BannerService } from "../../../services/banner/banner-service";
import { isSuccess } from "../../../services/base-response";
import { BannerResponse } from "../../../response/banner";
import { domainMedia } from "../../../enums/Enum";
const HomeSlider = () => {
  const [banner, setBanner] = useState<BannerResponse[]>([]);
  const { fetch: getAllBanner, response: resBanner } = BannerService.getAllBanner();
  useEffect(() => {
    getAllBanner();
  }, []);

  useEffect(() => {
    if (resBanner) {
      if (isSuccess(resBanner)) {
        setBanner(resBanner.data);
      }
    }
  }, [resBanner]);
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
          
            {banner.map((item, index) => (
              <div key={index} className="item">
                <img src={domainMedia+item.media.url} className="w-100"></img>
                <div className="slider-content">
                  <h1 className="display-2 mb-40">
                    {item.title}
                  </h1>
                  <p className="mb-65 mt-20 ">{item.description}</p>
                  <FormSendEmail></FormSendEmail>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};
export default HomeSlider;
