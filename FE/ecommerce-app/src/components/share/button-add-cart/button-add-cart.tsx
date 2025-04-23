import React, { useState } from "react";
import "./button-add-cart.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ProductResponse } from "../../../response/product";
import Toast from "../toast/Toast";
import { useAppDispatch } from "../../../store/store";
import { addToCart } from "../../../store/reducers/cart-reducer";
interface PaddingProps {
  padding?: string;
  product: ProductResponse;
}
const ButtonAddCart: React.FC<PaddingProps> = ({ padding, product }) => {
  const [quantity] = useState(1);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    if (product.stock <= 0) {
      Toast.ToastError("Sản phẩm đã hết hàng");
      return;
    }

    dispatch(addToCart({ product, quantity }));
    Toast.ToastSuccess("Đã thêm sản phẩm vào giỏ hàng");
  };

  return (
    <>
      <div className="add-cart" onClick={handleAddToCart}>
        <a className="add btn w-100" style={{ padding }}>
          <AddShoppingCartIcon></AddShoppingCartIcon>
          <span>Thêm vào giỏ hàng</span>
        </a>
      </div>
    </>
  );
};

export default ButtonAddCart;
