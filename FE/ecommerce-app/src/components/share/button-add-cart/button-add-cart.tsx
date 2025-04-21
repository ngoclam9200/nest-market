import React from "react";
import "./button-add-cart.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
interface PaddingProps {
  padding?: string;
}

const ButtonAddCart: React.FC<PaddingProps> = ({ padding }) => {
  return (
    <>
      <div className="add-cart">
        <a className="add btn w-100" style={{ padding }}>
          <AddShoppingCartIcon></AddShoppingCartIcon>
          <span>Thêm vào giỏ hàng</span>
        </a>
      </div>
    </>
  );
};

export default ButtonAddCart;
