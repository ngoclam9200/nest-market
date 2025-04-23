// src/pages/ListProduct/components/ProductGrid.tsx
import ProductItem from "../../../components/product-item/product-item";
import { ProductResponse } from "../../../response/product";
import Loading from "../Loading/Loading";

interface ProductGridProps {
  listProduct: ProductResponse[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ listProduct, loading }) => {
  if (loading) return (
    <div className="w-full flex justify-center items-center">
      <Loading />
    </div>
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {listProduct.length === 0 && <div className="col-span-full text-center">Không có sản phẩm</div>}
      {listProduct.map((product) => (
        <div key={product.id} className="w-full">
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
