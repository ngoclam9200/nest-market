import QuantityInput from "../../components/share/quantity-input/quantity-input";
import RatingProduct from "../../components/share/rating-product/rating-product";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./shopping-cart.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { CartItem, updateQuantity } from "../../store/reducers/cart-reducer";
import { removeFromCart } from "../../store/reducers/cart-reducer"; // Assuming these actions exist
import { Link } from "react-router-dom";
import { formatCurrencyDecimal } from "../../utils/helpers";
import { domainMedia } from "../../enums/Enum";

const Cart = () => {
  const { itemsCart, totalPriceCart } = useAppSelector((state) => state.cart);
  console.log("🚀 ~ Cart ~ itemsCart:", itemsCart);
  const dispatch = useAppDispatch();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Handle quantity change
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  // Handle remove item from cart
  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  // Handle clear cart
  const handleClearCart = () => {
    itemsCart.forEach((item) => {
      dispatch(removeFromCart(item.product.id));
    });
  };

  // Handle select all items
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(itemsCart.map((item) => item.product.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle select individual item
  const handleSelectItem = (productId: number) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  // Update selectAll state when selectedItems changes
  useEffect(() => {
    // if (itemsCart.length > 0 && selectedItems.length === itemsCart.length) {
    //   setSelectAll(true);
    // } else {
    //   setSelectAll(false);
    // }
  }, [selectedItems, itemsCart]);

  // Calculate subtotal for selected items
  const calculateSelectedSubtotal = () => {
    return formatCurrencyDecimal(
      itemsCart
        ?.filter((item) => selectedItems.includes(item.product.id))
        .reduce((total, item) => total + item.product.price * (1 - item.product.discount / 100) * item.quantity, 0)
    );
  };

  return (
    <>
      <div className="container-fluid mt-50">
        <div className="row">
          <div className="col-lg-8 mb-40">
            <h1 className="heading-2 mb-10">Giỏ hàng</h1>
            <div className="d-flex justify-content-between">
              <h6 className="text-body">
                Có <span className="text-brand">{itemsCart?.length}</span> sản phẩm trong giỏ hàng
              </h6>
              {itemsCart?.length > 0 && (
                <h6 className="text-body">
                  <a href="#" className="text-muted" onClick={handleClearCart}>
                    <i className="fi-rs-trash mr-5"></i>Xóa tất cả trong giỏ hàng
                  </a>
                </h6>
              )}
            </div>
          </div>
        </div>
        <div className="row" data-select2-id="19">
          <div className="col-lg-8" data-select2-id="18">
            <div className="table-responsive shopping-summery">
              {itemsCart.length > 0 && (
                <table className="table table-wishlist">
                  <thead>
                    <tr className="main-heading">
                      <th className="custome-checkbox start text-center">
                        <input className="form-check-input flex" type="checkbox" name="checkbox" id="exampleCheckbox11" checked={selectAll} onChange={handleSelectAll} />
                      </th>
                      <th className="text-center" scope="col">
                        Sản phẩm
                      </th>
                      <th className="text-center" scope="col">
                        Giá{" "}
                      </th>
                      <th className="text-center" scope="col">
                        Số lượng
                      </th>
                      <th className="text-center" scope="col">
                        Tổng
                      </th>
                      <th className="text-center" scope="col">
                        Xóa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsCart.map((item: CartItem) => (
                      <tr className="pt-30" key={item.product.id}>
                        <td className="customer-checkbox text-center ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id={`checkbox-${item.product.id}`}
                            checked={selectedItems.includes(item.product.id)}
                            onChange={() => handleSelectItem(item.product.id)}
                          />
                        </td>
                        <td className="image product-thumbnail   text-center">
                          <div className="flex gap-2 items-center">
                            <img src={item.product.media && item.product.media.length > 0 ? domainMedia + item.product.media[0].url : ""} alt={item.product.name} />
                            <div className="flex-col flex ">
                              <h6 className="mb-5">
                                <Link className="product-name mb-10 text-heading" to={`/product/${item.product.id}`}>
                                  {item.product.name}
                                </Link>
                              </h6>
                              <RatingProduct rating={item.product.rating} />
                            </div>
                          </div>
                        </td>
                        <td className="price text-center" data-title="Price">
                          <h4 className="text-body">{formatCurrencyDecimal(item.product.price * (1 - item.product.discount / 100))} </h4>
                          {item.product.discount > 0 && <span className="text-muted text-decoration-line-through">{formatCurrencyDecimal(item.product.price)}</span>}
                        </td>
                        <td className="text-center detail-info" data-title="Stock">
                          <div className="detail-extralink mr-15">
                            <QuantityInput quantity={item.quantity} setQuantity={(newQuantity) => handleQuantityChange(item.product.id, newQuantity)} />
                          </div>
                        </td>
                        <td className="price text-center" data-title="Price">
                          <h4 className="text-brand">{formatCurrencyDecimal(item.product.price * (1 - item.product.discount / 100) * item.quantity)} </h4>
                        </td>
                        <td className="action text-center text-center" data-title="Remove">
                          <DeleteForeverIcon className="btn-delete" onClick={() => handleRemoveItem(item.product.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {itemsCart?.length === 0 && (
                <div className="w-full text-center items-center flex flex-col">
                  <h4>Giỏ hàng của bạn đang trống</h4>
                  <Link to="/shop" className="btn mt-3">
                    Tiếp tục mua sắm
                  </Link>
                </div>
              )}
            </div>
            <div className="divider-2 mb-30"></div>
          </div>
          <div className="col-lg-4">
            <div className="border p-md-4 cart-totals ml-30">
              <div className="table-responsive">
                <table className="table no-border">
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "middle" }} className="cart_total_label">
                        <h6 className="text-muted">Tạm tính</h6>
                      </td>
                      <td style={{ verticalAlign: "middle" }} className="cart_total_amount">
                        <h4 className="text-brand text-end">{calculateSelectedSubtotal()}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "middle" }} scope="col" colSpan={2}>
                        <div className="divider-2 mt-10 mb-10"></div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "middle" }} className="cart_total_label">
                        <h6 className="text-muted">Phí vận chuyển </h6>
                      </td>
                      <td style={{ verticalAlign: "middle" }} className="cart_total_amount">
                        <h5 className="text-heading text-end">freeship </h5>
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Estimate for</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h5 className="text-heading text-end">Vietnam</h5>
                      </td>
                    </tr> */}
                    <tr>
                      <td scope="col" colSpan={2}>
                        <div className="divider-2 mt-10 mb-10"></div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "middle" }} className="cart_total_label">
                        <h6 className="text-muted">Tổng tiền</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h4 className="text-brand text-end">{calculateSelectedSubtotal()}</h4></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link to="/checkout" className="btn mb-20 w-100">
                Thanh toán<i className="fi-rs-sign-out ml-15"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
