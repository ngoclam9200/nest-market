 
import Banner11 from "../../../assets/images/banner-11.png";

const BannerSection = () => {
  return (
    <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none animated">
      <img src={Banner11} alt="" />
      <div className="banner-text">
        <span className="category">Oganic</span>
        <h4>
          Save 17% <br />
          on <span className="text-brand">Oganic</span>
          <br />
          Juice
        </h4>
      </div>
    </div>
  );
};

export default BannerSection;