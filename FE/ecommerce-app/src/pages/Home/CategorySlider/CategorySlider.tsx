import Slider from "react-slick";
import "./CategorySlider.scss";

import Cate1 from "../../../assets/images/category/cat-1.png";
import Cate2 from "../../../assets/images/category/cat-2.png";
import Cate3 from "../../../assets/images/category/cat-3.png";
import Cate4 from "../../../assets/images/category/cat-4.png";
import Cate5 from "../../../assets/images/category/cat-5.png";
import Cate9 from "../../../assets/images/category/cat-9.png";
import Cate11 from "../../../assets/images/category/cat-11.png";
import Cate12 from "../../../assets/images/category/cat-12.png";
import Cate13 from "../../../assets/images/category/cat-13.png";
import Cate14 from "../../../assets/images/category/cat-14.png";
import Cate15 from "../../../assets/images/category/cat-15.png";
import Banner1 from "../../../assets/images/banner-1.png";
import Banner2 from "../../../assets/images/banner-2.png";
import Banner3 from "../../../assets/images/banner-3.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef } from "react";

const CategorySlider = () => {
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
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    arrows: false,
    fade: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 9,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <>
      <div className="category-slider-section">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2>Featured Categories</h2>
            <div className="d-flex">
              <div className="button-arrow">
                <ArrowBackIcon onClick={previous}></ArrowBackIcon>
              </div>
              <div className="button-arrow">
                <ArrowForwardIcon onClick={next}></ArrowForwardIcon>
              </div>
            </div>
          </div>

          <Slider
            ref={(slider: any) => {
              sliderRef = slider;
            }}
            {...settings}
            className="category-slider-main"
          >
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate13}></img>
                <h4 className="title"> Cake &amp; Milk</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate12}></img>
                <h4 className="title"> Oganic Kiwi</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate11}></img>
                <h4 className="title"> Peach</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate9}></img>
                <h4 className="title"> Red Apple</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate3}></img>
                <h4 className="title"> Snack</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate1}></img>
                <h4 className="title"> Vegetables</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate2}></img>
                <h4 className="title"> Strawbery</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate4}></img>
                <h4 className="title"> Black plum</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate5}></img>
                <h4 className="title"> Cutard apple</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate14}></img>
                <h4 className="title"> Coffee & Tea</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
            <div className="item">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={Cate15}></img>
                <h4 className="title"> Headphone</h4>
                <div className="count"> 15 items</div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="banner-img   ">
              <img src={Banner1} alt="" />
              <div className="banner-text">
                <h4>
                  Everyday Fresh &amp; <br />
                  Clean with Our
                  <br />
                  Products
                </h4>
                <a className="btn btn-xs">
                  Shop Now <i className="fi-rs-arrow-small-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="banner-img   ">
              <img src={Banner2} alt="" />
              <div className="banner-text">
                <h4>
                  Make your Breakfast
                  <br />
                  Healthy and Easy
                </h4>
                <a className="btn btn-xs">
                  Shop Now <i className="fi-rs-arrow-small-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-md-none d-lg-flex">
            <div className="banner-img mb-sm-0   ">
              <img src={Banner3} alt="" />
              <div className="banner-text">
                <h4>
                  The best Organic <br />
                  Products Online
                </h4>
                <a className="btn btn-xs">
                  Shop Now <i className="fi-rs-arrow-small-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySlider;
