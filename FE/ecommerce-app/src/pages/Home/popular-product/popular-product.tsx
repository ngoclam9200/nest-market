import "./popular-product.scss";

import { ProductService } from "../../../services/product/product-service";
import { useEffect, useState } from "react";
import { isSuccess } from "../../../services/base-response";
import { ProductResponse } from "../../../response/product";
import ProductItem from "../../../components/product-item/product-item";
// import ProductItem from "../../../components/product-item/product-item";

const PopularProduct = () => {
  const { fetch: getPopularProduct, response: resPopularProduct } = ProductService.getPopularProduct();
  const [popularProduct, setPopularProduct] = useState<ProductResponse[]>([]);

  useEffect(() => {
    getPopularProduct({ count: +10 });
  }, []);

  useEffect(() => {
    if (resPopularProduct) {
      if (isSuccess(resPopularProduct)) {
        setPopularProduct(resPopularProduct.data);
      }
    }
  }, [resPopularProduct]);

  return (
    <>
      <div className="w-full px-4">
        <div className="title-popular-product">
          <h2>Sản phẩm mới</h2>
        </div>

        <div className="tab-content">
          <div className="active">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {popularProduct.map((product) => (
                <div className="col-span-1" key={product.id}>
                  <ProductItem product={product}></ProductItem>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProduct;
