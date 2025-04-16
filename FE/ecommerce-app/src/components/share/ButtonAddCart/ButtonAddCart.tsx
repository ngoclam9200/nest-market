import React from 'react';
import './ButtonAddCart.scss'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
interface PaddingProps{
  padding?:string
}

const ButtonAddCart : React.FC<PaddingProps> =({padding})=>{
    return (
      <>
        <div className="add-cart">
          <a className="add btn w-100" style={{padding}} >
            <AddShoppingCartIcon></AddShoppingCartIcon>
            <span>Add to cart</span>
          </a>
        </div>
      </>
    );
}

export default ButtonAddCart