import "./TrendingProduct.scss";
import SmallProduct from "./SmallProduct.tsx/SmallProduct";

const TrendingProduct = () => {
  return (
    <>
      <div className="container-fluid trending-list">
        <div className="row ">
          <div className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0   ">
            <h4 className="section-title style-1 mb-30 ">Top Selling</h4>
            <div className="product-list-small  ">
              <SmallProduct></SmallProduct>
              <SmallProduct></SmallProduct>
              <SmallProduct></SmallProduct>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 mb-md-0   ">
            <h4 className="section-title style-1 mb-30  ">Trending Products</h4>
            <div className="product-list-small  ">
              <SmallProduct></SmallProduct>
              <SmallProduct></SmallProduct>
              <SmallProduct></SmallProduct>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-lg-block  ">
            <h4 className="section-title style-1 mb-30  ">Recently added</h4>
            <div className="product-list-small  ">
              <SmallProduct></SmallProduct>
              <SmallProduct></SmallProduct>
              <SmallProduct></SmallProduct>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-xl-block  ">
            <h4 className="section-title style-1 mb-30  ">Top Rated</h4>
            <div className="product-list-small  ">
              <SmallProduct></SmallProduct>
              <SmallProduct></SmallProduct>
              <SmallProduct></SmallProduct>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingProduct;
