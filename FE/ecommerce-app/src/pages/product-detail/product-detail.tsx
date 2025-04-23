import BasicBreadcrumbs from "../../components/share/basic-breadcrumbs/basic-breadcrumbs";
import ButtonAddCart from "../../components/share/button-add-cart/button-add-cart";
import RatingProduct from "../../components/share/rating-product/rating-product";
import SliderImageProduct from "../../components/share/slider-image-product/slider-image-product";
import "./product-detail.scss";
import HomeOutlinedIcon from "@mui/icons-material/Home";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Img1 from "../../assets/images/banner-5.png";
import { LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import QuantityInput from "../../components/share/quantity-input/quantity-input";
import { ProductResponse } from "../../response/product";
import { ProductService } from "../../services/product/product-service";
import Loading from "../../components/share/Loading/Loading";
import { formatCurrencyDecimal } from "../../utils/helpers";
import { isSuccess } from "../../services/base-response";
// import { formatCurrencyDecimal } from "../../utils/format-currency";

const DetailProduct = () => {
  const { productId } = useParams();
  const [detailProduct, setDetailProduct] = useState<ProductResponse>(new ProductResponse());
  const [quantity, setQuantity] = useState<number>(1);
  const [valueTab, setValue] = useState(0);
  const { fetch: getDetailProduct, response: resDetail, loading: loading } = ProductService.getDetailProduct();
  const breadcrumb = [
    { name: "Trang chủ", href: "/", icon: HomeOutlinedIcon },
    {
      name: "Sản phẩm",
      href: "/product",
    },
    { name: detailProduct.name || "Chi tiết sản phẩm" },
  ];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const handleQuantityChange = (newQuantity: number) => {
  //   setQuantity(newQuantity);
  // };

  useEffect(() => {
    if (productId) {
      getDetailProduct(+productId);
    }
  }, [productId]);
  useEffect(() => {
    if (resDetail) {
      if (isSuccess(resDetail)) setDetailProduct(resDetail.data);
    }
  }, [resDetail]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  const calculateDiscountedPrice = () => {
    if (!detailProduct.price || !detailProduct.discount) return detailProduct.price;
    return detailProduct.price - (detailProduct.price * detailProduct.discount) / 100;
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
                        <SliderImageProduct images={detailProduct.media || []}></SliderImageProduct>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="detail-info pr-30 pl-30">
                        {detailProduct.discount > 0 && <span className="stock-status out-stock"> Giảm {detailProduct.discount}% </span>}
                        <h2 className="title-detail">{detailProduct.name}</h2>
                        <div className="product-detail-rating">{detailProduct.rating && <RatingProduct rating={detailProduct.rating}></RatingProduct>}</div>
                        <div className="clearfix product-price-cover">
                          <div className="product-price primary-color float-left">
                            <span className="current-price text-brand">{formatCurrencyDecimal(calculateDiscountedPrice())}</span>
                            {detailProduct.discount > 0 && (
                              <span>
                                <span className="save-price font-md color3 ml-15">{detailProduct.discount}% </span>
                                <span className="old-price font-md ml-15">{formatCurrencyDecimal(detailProduct.price)}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="short-desc mb-30">
                          <p className="font-lg">{detailProduct.description}</p>
                        </div>
                        {detailProduct.unit && (
                          <div className="attr-detail attr-size mb-30">
                            <strong className="mr-10">Đơn vị: </strong>
                            <span>{detailProduct.unit}</span>
                          </div>
                        )}
                        <div className="detail-extralink mb-20 flex-wrap">
                          <QuantityInput quantity={quantity} setQuantity={setQuantity}></QuantityInput>
                          <div className="product-extra-link2">
                            <ButtonAddCart
                              padding={"11px 20px 11px 30px"}
                              // product={detailProduct}
                              // quantity={quantity}
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
                              Danh mục: <span className="text-brand">{detailProduct.category.name || "Chưa phân loại"}</span>
                            </li>
                            <li className="mb-10">
                              Ngày tạo:
                              <span className="text-brand"> {new Date(detailProduct.created_at || "").toLocaleDateString()}</span>
                            </li>
                            <li>
                              Trạng thái: <span className="text-brand">{detailProduct.status === 1 ? "Còn hàng" : "Hết hàng"}</span>
                            </li>
                          </ul>
                          <ul className="float-start">
                            <li className="mb-10">
                              Mã sản phẩm: <a>#{detailProduct.id}</a>
                            </li>
                            <li>
                              Số lượng:
                              <span className="in-stock text-brand ml-5">{detailProduct.stock || 0} sản phẩm</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <Box sx={{ width: "100%" }}>
                      <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Mô tả" />
                        <Tab label="Đánh giá (3)" />
                      </Tabs>
                      <Box sx={{ padding: 3 }}>
                        {valueTab === 0 && (
                          <div className="tab-pane fade show pt-4" id="Description">
                            <table className="p-4 w-full">
                              <tr className=" p-4">
                                <td className="p-4 border w-[30%] bg-gray-50">Thương hiệu</td>
                                <td className="p-4 border">{detailProduct.brand}</td>
                              </tr>
                              <tr className="p-4">
                                <td className="p-4 border w-[30%] bg-gray-50">Nơi sản xuất</td>
                                <td className="p-4 border">{detailProduct.origin || ""}</td>
                              </tr>
                              <tr>
                                <td className="p-4 border w-[30%] bg-gray-50">Hạn sử dụng</td>
                                <td className="p-4 border">{detailProduct.expiry_date}</td>
                              </tr>

                              <tr className="p-4">
                                <td className="p-4 border w-[30%] bg-gray-50">Bảo quản</td>
                                <td className="p-4 border">{detailProduct.storage_instructions} </td>
                              </tr>
                            </table>
                            {/* <div className="">
                              <p>{detailProduct.description}</p>
                            </div> */}
                          </div>
                        )}

                        {valueTab === 1 && (
                          <div className="tab-pane fade show" id="Reviews">
                            <div className="comments-area">
                              <div className="row">
                                <div className="col-lg-8">
                                  <h4 className="mb-30">Đánh giá từ khách hàng</h4>
                                  <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex mb-30">
                                      <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                          <img src={Img1} className="mb-10" alt="" />
                                          <a className="font-heading mt-10 text-brand">Khách hàng 1</a>
                                        </div>
                                        <div className="desc">
                                          <div className="d-flex justify-content-between mb-10">
                                            <div className="d-flex align-items-center">
                                              <span className="font-xs text-muted">15/06/2024 </span>
                                            </div>
                                            <div className="product-rate d-inline-block">
                                              <div className="product-rating"></div>
                                            </div>
                                          </div>
                                          <p className="mb-10">
                                            Sản phẩm rất tốt, giao hàng nhanh chóng, đóng gói cẩn thận.
                                            <a className="reply">Trả lời</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="single-comment justify-content-between d-flex mb-30 ml-30">
                                      <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                          <img src={Img1} className="mb-10" alt="" />
                                          <a className="font-heading mt-10 text-brand">Khách hàng 2</a>
                                        </div>
                                        <div className="desc">
                                          <div className="d-flex justify-content-between mb-10">
                                            <div className="d-flex align-items-center">
                                              <span className="font-xs text-muted">20/06/2024 </span>
                                            </div>
                                            <div className="product-rate d-inline-block">
                                              <div className="product-rating"></div>
                                            </div>
                                          </div>
                                          <p className="mb-10">
                                            Chất lượng sản phẩm tuyệt vời, đúng như mô tả.
                                            <a className="reply">Trả lời</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="single-comment justify-content-between d-flex">
                                      <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                          <img src={Img1} className="mb-10" alt="" />
                                          <a className="font-heading mt-10 text-brand">Khách hàng 3</a>
                                        </div>
                                        <div className="desc">
                                          <div className="d-flex justify-content-between mb-10">
                                            <div className="d-flex align-items-center">
                                              <span className="font-xs text-muted">25/06/2024 </span>
                                            </div>
                                            <div className="product-rate d-inline-block">
                                              <div className="product-rating"></div>
                                            </div>
                                          </div>
                                          <p className="mb-10">
                                            Tôi rất hài lòng với sản phẩm này, sẽ mua lại lần sau.
                                            <a className="reply">Trả lời</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <h4 className="mb-20 mt-20">Đánh giá tổng quan</h4>
                                  <div className="d-flex mb-20">
                                    <RatingProduct rating={detailProduct.rating}></RatingProduct>
                                  </div>
                                  <div className="progress-star">
                                    <div className="5-star mt-10 d-flex">
                                      <span className="text">5 sao</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress variant="determinate" value={50} />
                                        <div className="text-star">50%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star mt-10 d-flex">
                                      <span className="text">4 sao</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress variant="determinate" value={40} />
                                        <div className="text-star">40%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star mt-10 d-flex">
                                      <span className="text">3 sao</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress variant="determinate" value={30} />
                                        <div className="text-star">30%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star mt-10 d-flex">
                                      <span className="text">2 sao</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress variant="determinate" value={20} />
                                        <div className="text-star">20%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star mt-10 d-flex">
                                      <span className="text">2 sao</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress variant="determinate" value={20} />
                                        <div className="text-star">20%</div>
                                      </Box>
                                    </div>
                                    <div className="5-star mt-10 d-flex">
                                      <span className="text">1 sao</span>
                                      <Box sx={{ width: "100%" }}>
                                        <LinearProgress variant="determinate" value={10} />
                                        <div className="text-star">10%</div>
                                      </Box>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="comment-form">
                              <h4 className="mb-15">Thêm đánh giá</h4>
                              <div className="product-rate d-inline-block mb-30"></div>
                              <div className="row">
                                <div className="col-lg-8 col-md-12">
                                  <form className="form-contact comment_form" action="#" id="commentForm">
                                    <div className="row">
                                      <div className="col-12">
                                        <div className="form-group">
                                          <textarea className="form-control w-100" name="comment" id="comment" cols={30} rows={9} placeholder="Viết đánh giá của bạn"></textarea>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="form-group">
                                          <input className="form-control" name="name" id="name" type="text" placeholder="Họ tên" />
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="form-group">
                                          <input className="form-control" name="email" id="email" type="email" placeholder="Email" />
                                        </div>
                                      </div>
                                      <div className="col-12">
                                        <div className="form-group">
                                          <input className="form-control" name="website" id="website" type="text" placeholder="Website (nếu có)" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <button type="submit" className="button button-contactForm">
                                        Gửi đánh giá
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
                      <h2 className="section-title style-1 mb-30">Sản phẩm liên quan</h2>
                    </div>
                    <div className="col-12">
                      <div className="row related-products">
                        {/* Related products will be rendered here */}
                        {/* You can implement a component to fetch and display related products based on category */}
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
