import BasicBreadcrumbs from "../../components/share/BasicBreadcrumbs/BasicBreadcrumbs";
import ButtonAddCart from "../../components/share/ButtonAddCart/ButtonAddCart";
import RatingProduct from "../../components/share/RatingProduct/RatingProduct";
import SliderImageProduct from "../../components/share/SliderImageProduct/SliderImageProduct";
import "./DetailProduct.scss";
import HomeOutlinedIcon from "@mui/icons-material/Home";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Img1 from "../../assets/images/banner-5.png";
import { LinearProgress } from "@mui/material";
import Product from "../../components/product/Product";
import QuantityInput from "../../components/share/QuantityInput/QuantityInput";

const DetailProduct = () => {
  const breadcrumb = [
    { name: "Home", href: "/", icon: HomeOutlinedIcon },
    {
      name: "Category",
      href: "/material-ui/getting-started/installation/",
    },
    { name: "Snack" },
  ];

  const [valueTab, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="breadcrumbs">
        <BasicBreadcrumbs breadcrumb={breadcrumb}></BasicBreadcrumbs>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-11 col-lg-12 m-auto">
            <div className="row">
              <div className="col-xl-12">
                <div className="product-detail accordion-detail">
                  <div className="row mb-50 mt-30">
                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                      <div className="detail-gallery">
                        <span className="zoom-icon">
                          <i className="fi-rs-search"></i>
                        </span>

                        <SliderImageProduct></SliderImageProduct>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="detail-info pr-30 pl-30">
                        <span className="stock-status out-stock">
                          {" "}
                          Sale Off{" "}
                        </span>
                        <h2 className="title-detail">
                          Seeds of Change Organic Quinoa, Brown
                        </h2>
                        <div className="product-detail-rating">
                          <RatingProduct></RatingProduct>
                        </div>
                        <div className="clearfix product-price-cover">
                          <div className="product-price primary-color float-left">
                            <span className="current-price text-brand">
                              $38
                            </span>
                            <span>
                              <span className="save-price font-md color3 ml-15">
                                26% Off
                              </span>
                              <span className="old-price font-md ml-15">
                                $52
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="short-desc mb-30">
                          <p className="font-lg">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Aliquam rem officia, corrupti reiciendis
                            minima nisi modi, quasi, odio minus dolore impedit
                            fuga eum eligendi.
                          </p>
                        </div>
                        <div className="attr-detail attr-size mb-30">
                          <strong className="mr-10">Size / Weight: </strong>
                          <ul className="list-filter size-filter font-small">
                            <li>
                              <a>50g</a>
                            </li>
                            <li className="active">
                              <a>60g</a>
                            </li>
                            <li>
                              <a>80g</a>
                            </li>
                            <li>
                              <a>100g</a>
                            </li>
                            <li>
                              <a>150g</a>
                            </li>
                          </ul>
                        </div>
                        <div className="detail-extralink mb-20 flex-wrap">
                          <QuantityInput count={1} ></QuantityInput>
                          <div className="product-extra-link2">
                            <ButtonAddCart
                              padding={"11px 20px 11px 30px"}
                            ></ButtonAddCart>
                          </div>
                          <div className="product-extra-link2">
                            <a className="action-btn hover-up wishlist">
                              <FavoriteBorderIcon></FavoriteBorderIcon>
                            </a>
                          </div>
                          <div className="product-extra-link2">
                            <a className="action-btn hover-up compare">
                              <CompareArrowsIcon></CompareArrowsIcon>
                            </a>
                          </div>
                        </div>
                        <div className="font-xs">
                          <ul className="mr-50 float-start">
                            <li className="mb-10">
                              Type: <span className="text-brand">Organic</span>
                            </li>
                            <li className="mb-10">
                              MFG:
                              <span className="text-brand"> Jun 4.2024</span>
                            </li>
                            <li>
                              LIFE: <span className="text-brand">70 days</span>
                            </li>
                          </ul>
                          <ul className="float-start">
                            <li className="mb-10">
                              SKU: <a>FWM15VKT</a>
                            </li>
                            <li className="mb-10">
                              Tags: <a rel="tag">Snack</a>,{" "}
                              <a rel="tag">Organic</a>, <a rel="tag">Brown</a>
                            </li>
                            <li>
                              Stock:
                              <span className="in-stock text-brand ml-5">
                                8 Items In Stock
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <Box sx={{ width: "100%" }}>
                      <Tabs
                        value={valueTab}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label=" Description" />
                        <Tab label=" Reviews (3)" />
                      </Tabs>
                      <Box sx={{ padding: 3 }}>
                        {valueTab === 0 && (
                          <div
                            className="tab-pane fade show active"
                            id="Description"
                          >
                            <div className="">
                              <p>
                                Uninhibited carnally hired played in whimpered
                                dear gorilla koala depending and much yikes off
                                far quetzal goodness and from for grimaced
                                goodness unaccountably and meadowlark near
                                unblushingly crucial scallop tightly neurotic
                                hungrily some and dear furiously this apart.
                              </p>
                              <p>
                                Spluttered narrowly yikes left moth in yikes
                                bowed this that grizzly much hello on spoon-fed
                                that alas rethought much decently richly and wow
                                against the frequent fluidly at formidable
                                acceptably flapped besides and much circa far
                                over the bucolically hey precarious goldfinch
                                mastodon goodness gnashed a jellyfish and one
                                however because.
                              </p>
                            </div>
                          </div>
                        )}

                        {valueTab === 1 && (
                          <div className="tab-pane fade show" id="Reviews">
                            <div className="comments-area">
                              <div className="row">
                                <div className="col-lg-8">
                                  <h4 className="mb-30">
                                    Customer questions &amp; answers
                                  </h4>
                                  <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex mb-30">
                                      <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                          <img
                                            src={Img1}
                                            className="mb-10"
                                            alt=""
                                          />
                                          <a className="font-heading mt-10 text-brand">
                                            Sienna
                                          </a>
                                        </div>
                                        <div className="desc">
                                          <div className="d-flex justify-content-between mb-10">
                                            <div className="d-flex align-items-center">
                                              <span className="font-xs text-muted">
                                                December 4, 2024 at 3:12 pm{" "}
                                              </span>
                                            </div>
                                            <div className="product-rate d-inline-block">
                                              <div className="product-rating"></div>
                                            </div>
                                          </div>
                                          <p className="mb-10">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit.
                                            Delectus, suscipit exercitationem
                                            accusantium obcaecati quos voluptate
                                            nesciunt facilis itaque modi commodi
                                            dignissimos sequi repudiandae minus
                                            ab deleniti totam officia id
                                            incidunt?{" "}
                                            <a className="reply">Reply</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="single-comment justify-content-between d-flex mb-30 ml-30">
                                      <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                          <img
                                            src={Img1}
                                            className="mb-10"
                                            alt=""
                                          />
                                          <a className="font-heading mt-10 text-brand">
                                            Brenna
                                          </a>
                                        </div>
                                        <div className="desc">
                                          <div className="d-flex justify-content-between mb-10">
                                            <div className="d-flex align-items-center">
                                              <span className="font-xs text-muted">
                                                December 4, 2024 at 3:12 pm{" "}
                                              </span>
                                            </div>
                                            <div className="product-rate d-inline-block">
                                              <div className="product-rating"></div>
                                            </div>
                                          </div>
                                          <p className="mb-10">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit.
                                            Delectus, suscipit exercitationem
                                            accusantium obcaecati quos voluptate
                                            nesciunt facilis itaque modi commodi
                                            dignissimos sequi repudiandae minus
                                            ab deleniti totam officia id
                                            incidunt?{" "}
                                            <a className="reply">Reply</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="single-comment justify-content-between d-flex">
                                      <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                          <img
                                            src={Img1}
                                            className="mb-10"
                                            alt=""
                                          />
                                          <a className="font-heading mt-10 text-brand">
                                            Gemma
                                          </a>
                                        </div>
                                        <div className="desc">
                                          <div className="d-flex justify-content-between mb-10">
                                            <div className="d-flex align-items-center">
                                              <span className="font-xs text-muted">
                                                December 4, 2024 at 3:12 pm{" "}
                                              </span>
                                            </div>
                                            <div className="product-rate d-inline-block">
                                              <div className="product-rating"></div>
                                            </div>
                                          </div>
                                          <p className="mb-10">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit.
                                            Delectus, suscipit exercitationem
                                            accusantium obcaecati quos voluptate
                                            nesciunt facilis itaque modi commodi
                                            dignissimos sequi repudiandae minus
                                            ab deleniti totam officia id
                                            incidunt?{" "}
                                            <a className="reply">Reply</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <h4 className="mb-20 mt-20">Customer reviews</h4>
                                  <div className="d-flex mb-20">
                                    <RatingProduct></RatingProduct>
                                    {/* <h6>4.8 out of 5</h6> */}
                                  </div>
                                  <div className="progress-star">
                                    <div className="5-star  mt-10 d-flex">
                                      <span className="text">5 star</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress
                                          variant="determinate"
                                          value={50}
                                        />
                                        <div className="text-star">50%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star  mt-10 d-flex">
                                      <span className="text">4 star</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress
                                          variant="determinate"
                                          value={40}
                                        />
                                        <div className="text-star">40%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star  mt-10 d-flex">
                                      <span className="text">3 star</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress
                                          variant="determinate"
                                          value={30}
                                        />
                                        <div className="text-star">30%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star  mt-10 d-flex">
                                      <span className="text">2 star</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress
                                          variant="determinate"
                                          value={20}
                                        />
                                        <div className="text-star">20%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star  mt-10 d-flex">
                                      <span className="text">1 star</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress
                                          variant="determinate"
                                          value={10}
                                        />
                                        <div className="text-star">10%</div>
                                      </Box>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="comment-form">
                              <h4 className="mb-15">Add a review</h4>
                              <div className="product-rate d-inline-block mb-30"></div>
                              <div className="row">
                                <div className="col-lg-8 col-md-12">
                                  <form
                                    className="form-contact comment_form"
                                    action="#"
                                    id="commentForm"
                                  >
                                    <div className="row">
                                      <div className="col-12">
                                        <div className="form-group">
                                          <textarea
                                            className="form-control w-100"
                                            name="comment"
                                            id="comment"
                                            cols={30}
                                            rows={9}
                                            placeholder="Write Comment"
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="form-group">
                                          <input
                                            className="form-control"
                                            name="name"
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="form-group">
                                          <input
                                            className="form-control"
                                            name="email"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-12">
                                        <div className="form-group">
                                          <input
                                            className="form-control"
                                            name="website"
                                            id="website"
                                            type="text"
                                            placeholder="Website"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <button
                                        type="submit"
                                        className="button button-contactForm"
                                      >
                                        Submit Review
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Box>
                    </Box>
                  </div>
                  <div className="row mt-60">
                    <div className="col-12">
                      <h2 className="section-title style-1 mb-30">
                        Related products
                      </h2>
                    </div>
                    <div className="col-12">
                      <div className="row related-products">
                        <div className="col-lg-3 col-md-4 col-12 col-sm-6">
                          <Product></Product>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12 col-sm-6">
                          <Product></Product>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12 col-sm-6">
                          <Product></Product>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12 col-sm-6">
                          <Product></Product>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
