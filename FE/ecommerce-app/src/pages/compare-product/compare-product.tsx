import { useEffect, useState } from "react";
import BasicBreadcrumbs from "../../components/share/basic-breadcrumbs/basic-breadcrumbs";
import RatingProduct from "../../components/share/rating-product/rating-product";
import "./compare-product.scss";
import HomeOutlinedIcon from "@mui/icons-material/Home";
import { ProductResponse } from "../../response/product";
import Cookies from "js-cookie";
import { domainMedia } from "../../enums/Enum";
import { formatCurrencyDecimal } from "../../utils/helpers";

const CompareProduct = () => {
  const [compareProducts, setCompareProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    // Get products from cookies
    const compareProductsCookie = Cookies.get("compareProducts");
    if (compareProductsCookie) {
      try {
        const parsedProducts = JSON.parse(compareProductsCookie);
        console.log("🚀 ~ useEffect ~ parsedProducts:", parsedProducts);
        setCompareProducts(parsedProducts);
      } catch (error) {
        console.error("Error parsing compare products from cookies:", error);
        setCompareProducts([]);
      }
    }
  }, []);

  const breadcrumb = [
    { name: "Trang chủ", href: "/", icon: HomeOutlinedIcon },
    {
      name: "Sản phẩm",
      href: "/product",
    },
    { name: "So sánh sản phẩm" },
  ];

  const removeProduct = (productId: number) => {
    const updatedProducts = compareProducts.filter((product) => product.id !== productId);
    setCompareProducts(updatedProducts);

    // Update cookies
    Cookies.set("compareProducts", JSON.stringify(updatedProducts), { expires: 7 });
  };

  return (
    <>
      <div className="breadcrumbs">
        <BasicBreadcrumbs breadcrumb={breadcrumb}></BasicBreadcrumbs>
      </div>
      <div className="container-fluid mt-50">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <h1 className="heading-2 mb-10">So sánh sản phẩm</h1>
            <h6 className="text-body mb-40">
              Có <span className="text-brand">{compareProducts.length}</span> sản phẩm để so sánh
            </h6>
            {compareProducts.length === 0 && <div className="w-full text-center">Không tìm thấy sản phẩm</div>}
            {compareProducts.length >0 && (
              <div className="table-responsive">
                <table className="table text-center table-compare">
                  <tbody>
                    <tr className="pr_image">
                      <td className="text-muted font-sm fw-600 font-heading mw-200"></td>
                      {compareProducts.map((product) => (
                        <td key={`img-${product.id}`} className="row_img">
                          <img className="w-full h-full p-4 rounded-lg" src={product.media_default?.url ? domainMedia + product.media_default.url : ""} alt={product.name} />
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_title">
                      <td className="text-muted font-sm fw-600 font-heading">Tên</td>
                      {compareProducts.map((product) => (
                        <td key={`name-${product.id}`} className="product_name">
                          <h6>
                            <a href={`/product-detail/${product.id}`} className="text-heading">
                              {product.name}
                            </a>
                          </h6>
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_price">
                      <td className="text-muted font-sm fw-600 font-heading">Giá</td>
                      {compareProducts.map((product) => (
                        <td key={`price-${product.id}`} className="product_price">
                          <h4 className="price text-brand">{formatCurrencyDecimal(product.price)}</h4>
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_rating">
                      <td className="text-muted font-sm fw-600 font-heading">Đánh giá</td>
                      {compareProducts.map((product) => (
                        <td key={`rating-${product.id}`}>
                          <div className="rating_wrap justify-content-center d-flex">
                            <RatingProduct rating={product.rating || 0} />
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="description">
                      <td className="text-muted font-sm fw-600 font-heading">Mô tả</td>
                      {compareProducts.map((product) => (
                        <td key={`desc-${product.id}`} className="row_text font-xs">
                          <p className="font-sm text-muted">{product.description}</p>
                        </td>
                      ))}
                    </tr>

                    <tr className="pr_weight">
                      <td className="text-muted font-sm fw-600 font-heading">Đơn vị bán</td>
                      {compareProducts.map((product) => (
                        <td key={`weight-${product.id}`} className="row_weight">
                          {product.unit || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_dimensions">
                      <td className="text-muted font-sm fw-600 font-heading">Thương hiệu</td>
                      {compareProducts.map((product) => (
                        <td key={`brand-${product.id}`} className="row_dimensions">
                          {product.brand || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_origin">
                      <td className="text-muted font-sm fw-600 font-heading">Nơi sản xuất</td>
                      {compareProducts.map((product) => (
                        <td key={`brand-${product.id}`} className="row_origin">
                          {product.origin || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_origin">
                      <td className="text-muted font-sm fw-600 font-heading">Hạn sử dụng</td>
                      {compareProducts.map((product) => (
                        <td key={`brand-${product.id}`} className="row_origin">
                          {product.expiry_date || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_origin">
                      <td className="text-muted font-sm fw-600 font-heading">Bảo quản</td>
                      {compareProducts.map((product) => (
                        <td key={`brand-${product.id}`} className="row_origin">
                          {product.storage_instructions || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_stock">
                      <td className="text-muted font-sm fw-600 font-heading ">Trạng thái</td>
                      {compareProducts.map((product) => (
                        <td key={`stock-${product.id}`} className="row_stock">
                          <span className={`stock-status ${product.stock > 0 ? "in-stock" : "out-stock"} mb-0`}>{product.stock > 0 ? "Còn hàng" : "Hết hàng"}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_add_to_cart">
                      <td className="text-muted font-sm fw-600 font-heading"> </td>
                      {compareProducts.map((product) => (
                        <td key={`cart-${product.id}`} className="row_btn">
                          {product.stock > 0 ? (
                            <button className="btn btn-sm">
                              <i className="fi-rs-shopping-bag mr-5"></i>Thêm vào giỏ hàng
                            </button>
                          ) : (
                            <button className="btn btn-sm btn-secondary">
                              <i className="fi-rs-headset mr-5"></i>Liên hệ
                            </button>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_remove text-muted">
                      <td className="text-muted font-md fw-600"></td>
                      {compareProducts.map((product) => (
                        <td key={`remove-${product.id}`} className="row_remove">
                          <a
                            href="#"
                            className="text-muted text-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              removeProduct(product.id);
                            }}
                          >
                            <span className="text-danger">Xóa</span>{" "}
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
