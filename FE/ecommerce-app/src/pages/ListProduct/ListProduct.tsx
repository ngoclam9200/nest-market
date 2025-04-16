import Product from "../../components/product/Product";
import Deal from "../Home/Deal/Deal";
import "./ListProduct.scss";
import GridViewIcon from "@mui/icons-material/GridView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import Pagination from "@mui/material/Pagination";
import Category1 from "../../assets/images/category/category-1.svg";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from "react";
import Thumnail1 from "../../assets/images/product/thumbnail-1.jpg";
import Banner11 from "../../assets/images/banner-11.png";
import BasicBreadcrumbs from "../../components/share/BasicBreadcrumbs/BasicBreadcrumbs";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const ListProduct = () => {
  const [startValue, setStartValue] = React.useState<number>(60);
  const [endValue, setEndValue] = React.useState<number>(100);
  const [value, setValue] = React.useState<number[]>([startValue, endValue]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setStartValue(newValue[0]);
      setEndValue(newValue[1]);
    }
    setValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }

  const breadcrumb = [
    { name: "Home", href: "/", icon: HomeOutlinedIcon },
    {
      name: "Category",
      href: "/material-ui/getting-started/installation/",
    },
    { name: "Snack" },
  ];
  return (
    
    <>
      <main className="main">
        <div className="page-header mt-30 mb-50">
          <div className="container-fluid">
            <div className="archive-header">
              <div className="row align-items-center">
                <div className="col-xl-12">
                  <h1 className="mb-15 text-center">Snack</h1>
                </div>
                <div className="col-xl-12  d-none d-xl-block">
                  <BasicBreadcrumbs breadcrumb={breadcrumb}></BasicBreadcrumbs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mb-30">
          <div className="row flex-row-reverse">
            <div className="col-lg-4-5">
              <div className="shop-product-fillter">
                <div className="totall-product">
                  <p>
                    We found <strong className="text-brand">29</strong> items
                    for you!
                  </p>
                </div>
                <div className="sort-by-product-area">
                  <div className="sort-by-cover mr-10">
                    <div className="sort-by-product-wrap">
                      <div className="sort-by">
                        <span>
                          <GridViewIcon></GridViewIcon>Show:
                        </span>
                      </div>
                      <div className="sort-by-dropdown-wrap">
                        <span>
                          50 <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                        </span>
                      </div>
                    </div>
                    <div className="sort-by-dropdown">
                      <ul>
                        <li>
                          <a className="active">
                            <CheckIcon></CheckIcon>
                            50
                          </a>
                        </li>
                        <li>
                          <a>100</a>
                        </li>
                        <li>
                          <a>150</a>
                        </li>
                        <li>
                          <a>200</a>
                        </li>
                        <li>
                          <a>All</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sort-by-cover">
                    <div className="sort-by-product-wrap">
                      <div className="sort-by">
                        <span>
                          <GridViewIcon></GridViewIcon>Sort by:
                        </span>
                      </div>
                      <div className="sort-by-dropdown-wrap">
                        <span>
                          Featured
                          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                        </span>
                      </div>
                    </div>
                    <div className="sort-by-dropdown">
                      <ul>
                        <li>
                          <a className="active">
                            <CheckIcon></CheckIcon>
                            Featured
                          </a>
                        </li>
                        <li>
                          <a>Price: Low to High</a>
                        </li>
                        <li>
                          <a>Price: High to Low</a>
                        </li>
                        <li>
                          <a>Release Date</a>
                        </li>
                        <li>
                          <a>Avg. Rating</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row product-grid">
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
                <div className="col-lg-1-4 col-md-4 col-12 col-sm-6">
                  <Product></Product>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
              <div className="theiaStickySidebar">
                <div className="sidebar-widget widget-category-2 mb-30">
                  <h5 className="section-title style-1 mb-30">Category</h5>
                  <ul>
                    <li>
                      <a>
                        <img src={Category1} alt="" />
                        Milks &amp; Dairies
                      </a>
                      <span className="count">11</span>
                    </li>
                    <li>
                      <a>
                        <img src={Category1} alt="" />
                        Clothing
                      </a>
                      <span className="count">12</span>
                    </li>
                    <li>
                      <a>
                        <img src={Category1} alt="" />
                        Pet Foods
                      </a>
                      <span className="count">0</span>
                    </li>
                    <li>
                      <a>
                        <img src={Category1} alt="" />
                        Baking material
                      </a>
                      <span className="count">0</span>
                    </li>
                    <li>
                      <a>
                        <img src={Category1} alt="" />
                        Fresh Fruit
                      </a>
                      <span className="count">0</span>
                    </li>
                  </ul>
                </div>
                <div className="sidebar-widget price_range range mb-30">
                  <h5 className="section-title style-1 mb-30">Fill by price</h5>
                  <div className="price-filter">
                    <div className="price-filter-inner">
                      <Slider
                        sx={{
                          color: "#3bb77e", // Change the track and thumb color
                          "& .MuiSlider-thumb": {
                            backgroundColor: "#3bb77e", // Change the thumb color
                          },
                          "& .MuiSlider-track": {
                            backgroundColor: "#3bb77e", // Change the track color
                          },
                          "& .MuiSlider-rail": {
                            backgroundColor: "grey", // Change the rail color
                          },
                        }}
                        size="medium"
                        max={200}
                        getAriaLabel={() => "Temperature range"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="off"
                        getAriaValueText={valuetext}
                      />
                      <Box sx={{ width: 200 }}></Box>
                      <div className="d-flex justify-content-between">
                        <div className="caption">
                          From:
                          <strong
                            id="slider-range-value1"
                            className="text-brand"
                          >
                            ${startValue}
                          </strong>
                        </div>
                        <div className="caption">
                          To:
                          <strong
                            id="slider-range-value2"
                            className="text-brand"
                          >
                            ${endValue}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" d-flex justify-content-center">
                    <a className="btn btn-sm btn-default">
                      <i className="fi-rs-filter mr-5"></i> Fillter
                    </a>
                  </div>
                </div>
                <div className="sidebar-widget product-sidebar mb-30 p-30 bg-grey border-radius-10">
                  <h5 className="section-title style-1 mb-30">New products</h5>
                  <div className="single-post clearfix">
                    <div className="image">
                      <img src={Thumnail1} alt="" />
                    </div>
                    <div className="content pt-10">
                      <h5>
                        <a>Chen Cardigan</a>
                      </h5>
                      <p className="price mb-0 mt-5">$99.50</p>
                      <div className="product-rate">
                        <div className="product-rating"></div>
                      </div>
                    </div>
                  </div>
                  <div className="single-post clearfix">
                    <div className="image">
                      <img src={Thumnail1} alt="" />
                    </div>
                    <div className="content pt-10">
                      <h6>
                        <a>Chen Sweater</a>
                      </h6>
                      <p className="price mb-0 mt-5">$89.50</p>
                      <div className="product-rate">
                        <div className="product-rating"></div>
                      </div>
                    </div>
                  </div>
                  <div className="single-post clearfix">
                    <div className="image">
                      <img src={Thumnail1} alt="" />
                    </div>
                    <div className="content pt-10">
                      <h6>
                        <a>Colorful Jacket</a>
                      </h6>
                      <p className="price mb-0 mt-5">$25</p>
                      <div className="product-rate">
                        <div className="product-rating"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none animated">
                  <img src={Banner11} alt="" />
                  <div className="banner-text">
                    <span className="category">Oganic</span>
                    <h4>
                      Save 17% <br />
                      on <span className="text-brand">Oganic</span>
                      <br />
                      Juice
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination count={10} />
          <Deal></Deal>
        </div>
      </main>
    </>
  );
};
export default ListProduct;
