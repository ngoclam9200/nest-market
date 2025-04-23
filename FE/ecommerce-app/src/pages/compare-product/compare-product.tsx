import BasicBreadcrumbs from "../../components/share/basic-breadcrumbs/basic-breadcrumbs";
import RatingProduct from "../../components/share/rating-product/rating-product";
import "./compare-product.scss";
import HomeOutlinedIcon from "@mui/icons-material/Home";
import { domainMedia } from "../../enums/Enum";
import { formatCurrencyDecimal } from "../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeFromCompare } from "../../store/reducers/compare-reducer";

const CompareProduct = () => {
  const { itemsCompare } = useAppSelector((state) => state.compare);
  console.log("🚀 ~ CompareProduct ~ itemsCompare:", itemsCompare)
  const dispatch = useAppDispatch();

  const breadcrumb = [
    { name: "Trang chủ", href: "/", icon: HomeOutlinedIcon },
    {
      name: "Sản phẩm",
      href: "/product",
    },
    { name: "So sánh sản phẩm" },
  ];

  const removeProduct = (productId: number) => {
    dispatch(removeFromCompare(productId));
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
              Có <span className="text-brand">{itemsCompare?.length}</span> sản phẩm để so sánh
            </h6>
            {itemsCompare?.length === 0 && <div className="w-full text-center">Không tìm thấy sản phẩm</div>}
            {itemsCompare?.length > 0 && (
              <div className="table-responsive">
                <table className="table text-center table-compare">
                  <tbody>
                    <tr className="pr_image">
                      <td className="text-muted font-sm fw-600 font-heading mw-200"></td>
                      {itemsCompare.map((product) => (
                        <td key={`img-${product.product.id}`} className="row_img">
                          <img
                            className="w-full h-full p-4 rounded-lg"
                            src={product.product.media_default?.url ? domainMedia + product.product.media_default.url : ""}
                            alt={product.product.name}
                          />
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_title">
                      <td className="text-muted font-sm fw-600 font-heading">Tên</td>
                      {itemsCompare.map((product) => (
                        <td key={`name-${product.product.id}`} className="product_name">
                          <h6>
                            <a href={`/product-detail/${product.product.id}`} className="text-heading">
                              {product.product.name}
                            </a>
                          </h6>
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_price">
                      <td className="text-muted font-sm fw-600 font-heading">Giá</td>
                      {itemsCompare.map((product) => (
                        <td key={`price-${product.product.id}`} className="product_price">
                          <h4 className="price text-brand">{formatCurrencyDecimal(product.product.price)}</h4>
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_rating">
                      <td className="text-muted font-sm fw-600 font-heading">Đánh giá</td>
                      {itemsCompare.map((product) => (
                        <td key={`rating-${product.product.id}`}>
                          <div className="rating_wrap justify-content-center d-flex">
                            <RatingProduct rating={product.product.rating || 0} />
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="description">
                      <td className="text-muted font-sm fw-600 font-heading">Mô tả</td>
                      {itemsCompare.map((product) => (
                        <td key={`desc-${product.product.id}`} className="row_text font-xs">
                          <p className="font-sm text-muted">{product.product.description}</p>
                        </td>
                      ))}
                    </tr>

                    <tr className="pr_weight">
                      <td className="text-muted font-sm fw-600 font-heading">Đơn vị bán</td>
                      {itemsCompare.map((product) => (
                        <td key={`weight-${product.product.id}`} className="row_weight">
                          {product.product.unit || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_dimensions">
                      <td className="text-muted font-sm fw-600 font-heading">Thương hiệu</td>
                      {itemsCompare.map((product) => (
                        <td key={`brand-${product.product.id}`} className="row_dimensions">
                          {product.product.brand || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_origin">
                      <td className="text-muted font-sm fw-600 font-heading">Nơi sản xuất</td>
                      {itemsCompare.map((product) => (
                        <td key={`brand-${product.product.id}`} className="row_origin">
                          {product.product.origin || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_origin">
                      <td className="text-muted font-sm fw-600 font-heading">Hạn sử dụng</td>
                      {itemsCompare.map((product) => (
                        <td key={`brand-${product.product.id}`} className="row_origin">
                          {product.product.expiry_date || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_origin">
                      <td className="text-muted font-sm fw-600 font-heading">Bảo quản</td>
                      {itemsCompare.map((product) => (
                        <td key={`brand-${product.product.id}`} className="row_origin">
                          {product.product.storage_instructions || ""}
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_stock">
                      <td className="text-muted font-sm fw-600 font-heading ">Trạng thái</td>
                      {itemsCompare.map((product) => (
                        <td key={`stock-${product.product.id}`} className="row_stock">
                          <span className={`stock-status ${product.product.stock > 0 ? "in-stock" : "out-stock"} mb-0`}>{product.product.stock > 0 ? "Còn hàng" : "Hết hàng"}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="pr_add_to_cart">
                      <td className="text-muted font-sm fw-600 font-heading"> </td>
                      {itemsCompare.map((product) => (
                        <td key={`cart-${product.product.id}`} className="row_btn">
                          {product.product.stock > 0 ? (
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
                      {itemsCompare.map((product) => (
                        <td key={`remove-${product.product.id}`} className="row_remove">
                          <a
                            href="#"
                            className="text-muted text-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              removeProduct(product.product.id);
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
