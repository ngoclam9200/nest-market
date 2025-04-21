import Slider from "react-slick";
import "./category-slider.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import { CategoryService } from "../../../services/category/category-service";
import { isSuccess } from "../../../services/base-response";
import { CategoryResponse } from "../../../response/category";
import { domainMedia } from "../../../enums/Enum";
import { ProductService } from "../../../services/product/product-service";
import { ProductResponse } from "../../../response/product";
import { useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const { fetch: getAllChildCategory, response: resChildCategory } = CategoryService.getAllChildCategory();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const { fetch: getNewestProduct, response: resNewestProduct } = ProductService.getNewestProduct();
  const [newestProduct, setNewestProduct] = useState<ProductResponse[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllChildCategory({ status: 1, parent_id: -1 });
    getNewestProduct({ count: +3 });
  }, []);

  useEffect(() => {
    if (resChildCategory) {
      if (isSuccess(resChildCategory)) {
        setCategories(resChildCategory.data);
      }
    }
  }, [resChildCategory]);
  useEffect(() => {
    if (resNewestProduct) {
      if (isSuccess(resNewestProduct)) {
        setNewestProduct(resNewestProduct.data);
      }
    }
  }, [resNewestProduct]);
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
          <div className="flex items-center content-between mb-3">
            <h2>Danh mục sản phẩm</h2>
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
            {categories.map((category, index) => (
              <div
                className="item"
                key={index}
                onClick={() => {
                  navigate("product", {
                    state: { categoryState: category },
                  });
                }}
              >
                <div className="grid grid-rows-[80px_40px_20px] h-[150px] w-full gap-1 text-center">
                  <div className="flex items-center justify-center w-full">
                    <img src={domainMedia + category.media.url} alt={category.name} className="w-16 h-16 object-contain" />
                  </div>
                  <div className="flex items-center justify-center px-2">
                    <h4 className="text-sm font-medium line-clamp-2 overflow-hidden break-all">{category.name}</h4>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-xs text-gray-500">15 items</div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {newestProduct.map((product, index) => (
            <div key={index} className="col-lg-4 d-md-none d-lg-flex">
              <div className="banner-img mb-sm-0  h-[200px] w-full">
                <img className="" src={domainMedia + product.media_default.url} alt="" />
                <div className="banner-text">
                  <h4 className="text-xl">{product.name}</h4>
                  <a className="btn btn-xs">
                    Shop Now <i className="fi-rs-arrow-small-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategorySlider;
