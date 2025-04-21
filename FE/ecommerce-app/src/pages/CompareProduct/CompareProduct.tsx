import BasicBreadcrumbs from "../../components/share/BasicBreadcrumbs/BasicBreadcrumbs";
import RatingProduct from "../../components/share/rating-product/rating-product";
import "./CompareProduct.scss";
import HomeOutlinedIcon from "@mui/icons-material/Home";

const CompareProduct = () => {
  const breadcrumb = [
    { name: "Home", href: "/", icon: HomeOutlinedIcon },
    {
      name: "Shop",
      href: "/material-ui/getting-started/installation/",
    },
    { name: "Compare" },
  ];
  return (
    <>
      <div className="breadcrumbs">
        <BasicBreadcrumbs breadcrumb={breadcrumb}></BasicBreadcrumbs>
      </div>
      <div className="container-fluid mt-50">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <h1 className="heading-2 mb-10">Products Compare</h1>
            <h6 className="text-body mb-40">
              There are <span className="text-brand">3</span> products to compare
            </h6>
            <div className="table-responsive">
              <table className="table text-center table-compare">
                <tbody>
                  <tr className="pr_image">
                    <td className="text-muted font-sm fw-600 font-heading mw-200">Preview</td>
                    <td className="row_img">
                      <img src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-2-1.jpg" alt="compare-img" />
                    </td>
                    <td className="row_img">
                      <img src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-2-1.jpg" alt="compare-img" />
                    </td>
                    <td className="row_img">
                      <img src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-2-1.jpg" alt="compare-img" />
                    </td>
                  </tr>
                  <tr className="pr_title">
                    <td className="text-muted font-sm fw-600 font-heading">Name</td>
                    <td className="product_name">
                      <h6>
                        <a href="shop-product-full.html" className="text-heading">
                          J.Crew Mercantile Women's Short
                        </a>
                      </h6>
                    </td>
                    <td className="product_name">
                      <h6>
                        <a href="shop-product-full.html" className="text-heading">
                          Amazon Essentials Women's Tanks
                        </a>
                      </h6>
                    </td>
                    <td className="product_name">
                      <h6>
                        <a href="shop-product-full.html" className="text-heading">
                          Amazon Brand - Daily Ritual Wom
                        </a>
                      </h6>
                    </td>
                  </tr>
                  <tr className="pr_price">
                    <td className="text-muted font-sm fw-600 font-heading">Price</td>
                    <td className="product_price">
                      <h4 className="price text-brand">$12.00</h4>
                    </td>
                    <td className="product_price">
                      <h4 className="price text-brand">$14.00</h4>
                    </td>
                    <td className="product_price">
                      <h4 className="price text-brand">$15.00</h4>
                    </td>
                  </tr>
                  <tr className="pr_rating">
                    <td className="text-muted font-sm fw-600 font-heading">Rating</td>
                    <td>
                      <div className="rating_wrap justify-content-center d-flex">
                        <RatingProduct></RatingProduct>
                      </div>
                    </td>
                    <td>
                      <div className="rating_wrap justify-content-center d-flex">
                        <RatingProduct></RatingProduct>
                      </div>
                    </td>
                    <td>
                      <div className="rating_wrap justify-content-center d-flex">
                        <RatingProduct></RatingProduct>
                      </div>
                    </td>
                  </tr>
                  <tr className="description">
                    <td className="text-muted font-sm fw-600 font-heading">Description</td>
                    <td className="row_text font-xs">
                      <p className="font-sm text-muted">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                      </p>
                    </td>
                    <td className="row_text font-xs">
                      <p className="font-sm text-muted">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                      </p>
                    </td>
                    <td className="row_text font-xs">
                      <p className="font-sm text-muted">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                      </p>
                    </td>
                  </tr>
                  <tr className="pr_stock">
                    <td className="text-muted font-sm fw-600 font-heading">Stock status</td>
                    <td className="row_stock">
                      <span className="stock-status in-stock mb-0">In Stock</span>
                    </td>
                    <td className="row_stock">
                      <span className="stock-status out-stock mb-0">Out of stock</span>
                    </td>
                    <td className="row_stock">
                      <span className="stock-status in-stock mb-0">In Stock</span>
                    </td>
                  </tr>
                  <tr className="pr_weight">
                    <td className="text-muted font-sm fw-600 font-heading">Weight</td>
                    <td className="row_weight">320 gram</td>
                    <td className="row_weight">370 gram</td>
                    <td className="row_weight">380 gram</td>
                  </tr>
                  <tr className="pr_dimensions">
                    <td className="text-muted font-sm fw-600 font-heading">Dimensions</td>
                    <td className="row_dimensions">N/A</td>
                    <td className="row_dimensions">N/A</td>
                    <td className="row_dimensions">N/A</td>
                  </tr>
                  <tr className="pr_add_to_cart">
                    <td className="text-muted font-sm fw-600 font-heading">Buy now</td>
                    <td className="row_btn">
                      <button className="btn btn-sm">
                        <i className="fi-rs-shopping-bag mr-5"></i>Thêm vào giỏ hàng
                      </button>
                    </td>
                    <td className="row_btn">
                      <button className="btn btn-sm btn-secondary">
                        <i className="fi-rs-headset mr-5"></i>Contact Us
                      </button>
                    </td>
                    <td className="row_btn">
                      <button className="btn btn-sm">
                        <i className="fi-rs-shopping-bag mr-5"></i>Thêm vào giỏ hàng
                      </button>
                    </td>
                  </tr>
                  <tr className="pr_remove text-muted">
                    <td className="text-muted font-md fw-600"></td>
                    <td className="row_remove">
                      <a href="#" className="text-muted">
                        <i className="fi-rs-trash mr-5"></i>
                        <span>Remove</span>{" "}
                      </a>
                    </td>
                    <td className="row_remove">
                      <a href="#" className="text-muted">
                        <i className="fi-rs-trash mr-5"></i>
                        <span>Remove</span>{" "}
                      </a>
                    </td>
                    <td className="row_remove">
                      <a href="#" className="text-muted">
                        <i className="fi-rs-trash mr-5"></i>
                        <span>Remove</span>{" "}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
