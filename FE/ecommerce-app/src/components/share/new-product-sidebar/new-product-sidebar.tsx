// src/pages/ListProduct/components/NewProductsSidebar.tsx
import Thumnail1 from "../../../assets/images/product/thumbnail-1.jpg";

const NewProductsSidebar = () => {
  return (
    <div className="sidebar-widget product-sidebar mb-30 p-30 bg-grey border-radius-10">
      <h5 className="section-title style-1 mb-30">New products</h5>
      <div className="single-post clearfix">
        <div className="image">
          <img src={Thumnail1} alt="" />
        </div>
        <div className="content pt-10">
          <h5>
            <a>Chen Cardigan</a>
          </h5>
          <p className="price mb-0 mt-5">$99.50</p>
          <div className="product-rate">
            <div className="product-rating"></div>
          </div>
        </div>
      </div>
      <div className="single-post clearfix">
        <div className="image">
          <img src={Thumnail1} alt="" />
        </div>
        <div className="content pt-10">
          <h6>
            <a>Chen Sweater</a>
          </h6>
          <p className="price mb-0 mt-5">$89.50</p>
          <div className="product-rate">
            <div className="product-rating"></div>
          </div>
        </div>
      </div>
      <div className="single-post clearfix">
        <div className="image">
          <img src={Thumnail1} alt="" />
        </div>
        <div className="content pt-10">
          <h6>
            <a>Colorful Jacket</a>
          </h6>
          <p className="price mb-0 mt-5">$25</p>
          <div className="product-rate">
            <div className="product-rating"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductsSidebar;
