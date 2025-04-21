import { ProductResponse } from "../../../response/product";
import { formatCurrencyDecimal } from "../../../utils/helpers";
import "./price-product.scss";

interface PriceProductProps {
  product: ProductResponse;
}
const PriceProduct = ({ product }: PriceProductProps) => {
  return (
    <>
      {product && (
        <div className="product-card-bottom">
          <div className="product-price ">
            <span>{formatCurrencyDecimal(product.price * (1 - product.discount / 100))}</span>
            <span className="old-price">{formatCurrencyDecimal(product.price)} </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceProduct;
