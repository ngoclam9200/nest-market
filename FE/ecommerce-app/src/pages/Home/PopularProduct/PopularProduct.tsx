import "./PopularProduct.scss";
import Product from "../../../components/product/Product";
const PopularProduct = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="title-popular-product">
          <h2> Popular Product</h2>
        </div>

        <div className="tab-content">
          <div className="tab-pane fade show active">
            <div className="row product-grid-4">
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>

              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <Product></Product>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProduct;
