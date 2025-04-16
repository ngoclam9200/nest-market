import "./mega-menu.scss";
import BannerMenu from "../../../../assets/images/banner-menu.png";
import { Link } from "react-router-dom";
const MegaMenu = () => {
  return (
    <>
      <ul className="mega-menu">
        <li className="sub-mega-menu sub-mega-menu-width-22">
          <Link className="menu-title" to="#">
            Fruit &amp; Vegetables
          </Link>
          <ul className="p-0">
            <li>
              <Link to="shop-product-right.html">Meat &amp; Poultry</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Fresh Vegetables</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Herbs &amp; Seasonings</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Cuts &amp; Sprouts</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Exotic Fruits &amp; Veggies</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Packaged Produce</Link>
            </li>
          </ul>
        </li>
        <li className="sub-mega-menu sub-mega-menu-width-22">
          <Link className="menu-title" to="#">
            Breakfast &amp; Dairy
          </Link>
          <ul className="p-0">
            <li>
              <Link to="shop-product-right.html">Milk &amp; Flavoured Milk</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Butter and Margarine</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Eggs Substitutes</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Marmalades</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Sour Cream</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Cheese</Link>
            </li>
          </ul>
        </li>
        <li className="sub-mega-menu sub-mega-menu-width-22">
          <Link className="menu-title" to="#">
            Meat &amp; Seafood
          </Link>
          <ul className="p-0">
            <li>
              <Link to="shop-product-right.html">Breakfast Sausage</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Dinner Sausage</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Chicken</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Sliced Deli Meat</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Wild Caught Fillets</Link>
            </li>
            <li>
              <Link to="shop-product-right.html">Crab and Shellfish</Link>
            </li>
          </ul>
        </li>
        <li className="sub-mega-menu sub-mega-menu-width-34">
          <div className="menu-banner-wrap">
            <Link to="shop-product-right.html">
              <img src={BannerMenu} alt="Nest" />
            </Link>
            <div className="menu-banner-content">
              <h4>Hot deals</h4>
              <h3>
                Don't miss
                <br />
                Trending
              </h3>
              <div className="menu-banner-price ">
                <span className="new-price text-success m-0">Save to 50%</span>
              </div>
              <div className="menu-banner-btn">
                <Link to="shop-product-right.html">Shop now</Link>
              </div>
            </div>
            <div className="menu-banner-discount">
              <h3>
                <span>25%</span>
                off
              </h3>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};
export default MegaMenu;
