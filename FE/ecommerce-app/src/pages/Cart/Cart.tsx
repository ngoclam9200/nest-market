import QuantityInput from "../../components/share/QuantityInput/QuantityInput";
import RatingProduct from "../../components/share/RatingProduct/RatingProduct";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./Cart.scss";

const Cart = () => {
  return (
    <>
      <div className="container-fluid mt-50">
        <div className="row">
          <div className="col-lg-8 mb-40">
            <h1 className="heading-2 mb-10">Your Cart</h1>
            <div className="d-flex justify-content-between">
              <h6 className="text-body">
                There are <span className="text-brand">3</span> products in your
                cart
              </h6>
              <h6 className="text-body">
                <a href="#" className="text-muted">
                  <i className="fi-rs-trash mr-5"></i>Clear Cart
                </a>
              </h6>
            </div>
          </div>
        </div>
        <div className="row" data-select2-id="19">
          <div className="col-lg-8" data-select2-id="18">
            <div className="table-responsive shopping-summery">
              <table className="table table-wishlist">
                <thead>
                  <tr className="main-heading">
                    <th className="custome-checkbox start pl-30">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="exampleCheckbox11"
                        value=""
                      />
                    </th>
                    <th scope="col" colSpan={2}>
                      Product
                    </th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col" className="end">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="pt-30">
                    <td className="custome-checkbox pl-30">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="exampleCheckbox1"
                        value=""
                      />
                    </td>
                    <td className="image product-thumbnail pt-40">
                      <img
                        src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-1-1.jpg"
                        alt="#"
                      />
                    </td>
                    <td className="product-des product-name">
                      <h6 className="mb-5">
                        <a
                          className="product-name mb-10 text-heading"
                          href="shop-product-right.html"
                        >
                          Field Roast Chao Cheese Creamy Original
                        </a>
                      </h6>
                      <RatingProduct></RatingProduct>
                    </td>
                    <td className="price" data-title="Price">
                      <h4 className="text-body">$2.51 </h4>
                    </td>
                    <td className="text-center detail-info" data-title="Stock">
                      <div className="detail-extralink mr-15">
                        <QuantityInput count={1}></QuantityInput>
                      </div>
                    </td>
                    <td className="price" data-title="Price">
                      <h4 className="text-brand">$2.51 </h4>
                    </td>
                    <td className="action text-center" data-title="Remove">
                      <DeleteForeverIcon className="btn-delete"></DeleteForeverIcon>
                    </td>
                  </tr>
                  <tr>
                    <td className="custome-checkbox pl-30">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="exampleCheckbox2"
                        value=""
                      />
                    </td>
                    <td className="image product-thumbnail">
                      <img
                        src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-1-1.jpg"
                        alt="#"
                      />
                    </td>
                    <td className="product-des product-name">
                      <h6 className="mb-5">
                        <a
                          className="product-name mb-10 text-heading"
                          href="shop-product-right.html"
                        >
                          Blue Diamond Almonds Lightly Salted
                        </a>
                      </h6>
                      <RatingProduct></RatingProduct>
                    </td>
                    <td className="price" data-title="Price">
                      <h4 className="text-body">$3.2 </h4>
                    </td>
                    <td className="text-center detail-info" data-title="Stock">
                      <div className="detail-extralink mr-15">
                       <QuantityInput count={1}></QuantityInput>
                      </div>
                    </td>
                    <td className="price" data-title="Price">
                      <h4 className="text-brand">$3.2 </h4>
                    </td>
                    <td className="action text-center" data-title="Remove">
                      <DeleteForeverIcon className="btn-delete"></DeleteForeverIcon>
                    </td>
                  </tr>
                  <tr>
                    <td className="custome-checkbox pl-30">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="exampleCheckbox3"
                        value=""
                      />
                    </td>
                    <td className="image product-thumbnail">
                      <img
                        src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-1-1.jpg"
                        alt="#"
                      />
                    </td>
                    <td className="product-des product-name">
                      <h6 className="mb-5">
                        <a
                          className="product-name mb-10 text-heading"
                          href="shop-product-right.html"
                        >
                          Fresh Organic Mustard Leaves Bell Pepper
                        </a>
                      </h6>
                      <RatingProduct></RatingProduct>
                    </td>
                    <td className="price" data-title="Price">
                      <h4 className="text-body">$2.43 </h4>
                    </td>
                    <td className="text-center detail-info" data-title="Stock">
                      <div className="detail-extralink mr-15">
                         <QuantityInput count={1}></QuantityInput>
                      </div>
                    </td>
                    <td className="price" data-title="Price">
                      <h4 className="text-brand">$2.43 </h4>
                    </td>
                    <td className="action text-center" data-title="Remove">
                      <DeleteForeverIcon className="btn-delete"></DeleteForeverIcon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="divider-2 mb-30"></div>
            <div className="cart-action d-flex justify-content-between">
              <a className="btn ">
                <i className="fi-rs-arrow-left mr-10"></i>Continue Shopping
              </a>
              <a className="btn  mr-10 mb-sm-15">
                <i className="fi-rs-refresh mr-10"></i>Update Cart
              </a>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="border p-md-4 cart-totals ml-30">
              <div className="table-responsive">
                <table className="table no-border">
                  <tbody>
                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Subtotal</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h4 className="text-brand text-end">$12.31</h4>
                      </td>
                    </tr>
                    <tr>
                      <td scope="col" colSpan={2}>
                        <div className="divider-2 mt-10 mb-10"></div>
                      </td>
                    </tr>
                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Shipping</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h5 className="text-heading text-end">Free </h5>
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Estimate for</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h5 className="text-heading text-end">
                          United Kingdom{" "}
                        </h5>
                      </td>
                    </tr>{" "}
                    <tr>
                      <td scope="col" colSpan={2}>
                        <div className="divider-2 mt-10 mb-10"></div>
                      </td>
                    </tr>
                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Total</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h4 className="text-brand text-end">$12.31</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <a href="#" className="btn mb-20 w-100">
                Proceed To CheckOut<i className="fi-rs-sign-out ml-15"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
