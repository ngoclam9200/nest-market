// src/pages/ListProduct/components/NewProductsSidebar.tsx
import { useEffect, useState } from "react";
import { ProductService } from "../../../services/product/product-service";
import { isSuccess } from "../../../services/base-response";
import { formatCurrencyDecimal } from "../../../utils/helpers";
import { domainMedia } from "../../../enums/Enum";
import { ProductResponse } from "../../../response/product";

const NewProductsSidebar = () => {
  const { fetch: getNewestProduct, response: resNewProduct } = ProductService.getNewestProduct();
  const [newProduct, setNewProduct] = useState<ProductResponse[]>([]);
  useEffect(() => {
    getNewestProduct({ count: 3 });
  }, []);
  useEffect(() => {
    if (resNewProduct) {
      if (isSuccess(resNewProduct)) {
        setNewProduct(resNewProduct.data);
      }
    }
  }, [resNewProduct]);
  return (
    <div className="sidebar-widget product-sidebar mb-30 p-30 bg-grey border-radius-10">
      <h5 className="section-title style-1 mb-30">Sản phẩm mới</h5>

      {newProduct.map((product: ProductResponse) => (
        <div key={product.id} className="single-post clearfix">
          <div className="image">
            <img className="w-full h-full" src={domainMedia + product.media_default.url} alt="" />
          </div>
          <div className="content pt-10">
            <h6>
              <a>{product.name}</a>
            </h6>
            <p className="price mb-0 mt-5">{formatCurrencyDecimal(product.price)}</p>
            <div className="product-rate">
              <div className="product-rating"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewProductsSidebar;
