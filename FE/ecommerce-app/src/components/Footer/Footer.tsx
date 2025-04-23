import FormSendEmail from "../share/form-send-mail/form-send-mail";
import "./Footer.scss";
import Banner9 from "../../assets/images/banner-9.png";
import Icon1 from "../../assets/images/footer/icon-1.svg";
import Icon2 from "../../assets/images/footer/icon-2.svg";
import Icon3 from "../../assets/images/footer/icon-3.svg";
import Icon4 from "../../assets/images/footer/icon-4.svg";
import Icon5 from "../../assets/images/footer/icon-5.svg";
import Icon6 from "../../assets/images/footer/icon-6.svg";
import Logo from "../../assets/images/logo.svg";
import IconClock from "../../assets/images/footer/icon-clock.svg";
import IconContact from "../../assets/images/footer/icon-contact.svg";
import IconEmail from "../../assets/images/footer/icon-email-2.svg";
import IconLocaction from "../../assets/images/footer/icon-location.svg";
import PaymentImg from "../../assets/images/footer/payment-method.png";
import GGPlay from "../../assets/images/footer/google-play.jpg";
import AppleStore from "../../assets/images/footer/app-store.jpg";

const Footer = () => {
  return (
    <>
      <footer className="main">
        <section className="newsletter mb-15  animate__ animate__fadeIn ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="position-relative newsletter-inner">
                  <div className="newsletter-content">
                    <h2 className="mb-20">
                      Stay home &amp; get your daily <br />
                      needs from our shop
                    </h2>
                    <p className="mb-45">
                      Start You'r Daily Shopping with
                      <span className="text-brand">Nest Mart</span>
                    </p>
                    <FormSendEmail></FormSendEmail>
                  </div>
                  <img src={Banner9} alt="newsletter" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="featured section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
                <div className="banner-left-icon d-flex align-items-center   ">
                  <div className="banner-icon">
                    <img src={Icon1} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Best prices &amp; offers</h3>
                    <p>Orders $50 or more</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div className="banner-left-icon d-flex align-items-center   ">
                  <div className="banner-icon">
                    <img src={Icon2} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Free delivery</h3>
                    <p>24/7 amazing services</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div className="banner-left-icon d-flex align-items-center   ">
                  <div className="banner-icon">
                    <img src={Icon3} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Great daily deal</h3>
                    <p>When you sign up</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div className="banner-left-icon d-flex align-items-center   ">
                  <div className="banner-icon">
                    <img src={Icon4} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Wide assortment</h3>
                    <p>Mega Discounts</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div className="banner-left-icon d-flex align-items-center   ">
                  <div className="banner-icon">
                    <img src={Icon5} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Easy returns</h3>
                    <p>Within 30 days</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-xl-none">
                <div className="banner-left-icon d-flex align-items-center  ">
                  <div className="banner-icon">
                    <img src={Icon6} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Safe delivery</h3>
                    <p>Within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding footer-mid">
          <div className="container pt-15 pb-20">
            <div className="row">
              <div className="col">
                <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0   ">
                  <div className="logo mb-30">
                    <a className="mb-15">
                      <img src={Logo} alt="logo" />
                    </a>
                    <p className="font-lg text-heading">Awesome grocery store website template</p>
                  </div>
                  <ul className="contact-infor">
                    <li>
                      <img src={IconLocaction} alt="" />
                      <strong>Address: </strong>
                      <span>5171 W Campbell Ave undefined Kent, Utah 53127 United States</span>
                    </li>
                    <li>
                      <img src={IconContact} alt="" />
                      <strong>Call Us:</strong>
                      <span>(+91) - 540-025-124553</span>
                    </li>
                    <li>
                      <img src={IconEmail} alt="" />
                      <strong>Email:</strong>
                      <span>sale@Nest.com</span>
                    </li>
                    <li>
                      <img src={IconClock} alt="" />
                      <strong>Hours:</strong>
                      <span>10:00 - 18:00, Mon - Sat</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-link-widget col   ">
                <h4 className=""> Company</h4>
                <ul className="footer-list mb-sm-5 mb-md-0">
                  <li>
                    <a>About Us</a>
                  </li>
                  <li>
                    <a>Delivery Information</a>
                  </li>
                  <li>
                    <a>Privacy Policy</a>
                  </li>
                  <li>
                    <a>Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a>Contact Us</a>
                  </li>
                  <li>
                    <a>Support Center</a>
                  </li>
                  <li>
                    <a>Careers</a>
                  </li>
                </ul>
              </div>
              <div className="footer-link-widget col   ">
                <h4 className="widget-title">Account</h4>
                <ul className="footer-list mb-sm-5 mb-md-0">
                  <li>
                    <a>Sign In</a>
                  </li>
                  <li>
                    <a>View Cart</a>
                  </li>
                  <li>
                    <a>My Wishlist</a>
                  </li>
                  <li>
                    <a>Track My Order</a>
                  </li>
                  <li>
                    <a>Help Ticket</a>
                  </li>
                  <li>
                    <a>Shipping Details</a>
                  </li>
                  <li>
                    <a>Compare products</a>
                  </li>
                </ul>
              </div>
              <div className="footer-link-widget col   ">
                <h4 className="widget-title">Corporate</h4>
                <ul className="footer-list mb-sm-5 mb-md-0">
                  <li>
                    <a>Become a Vendor</a>
                  </li>
                  <li>
                    <a>Affiliate Program</a>
                  </li>
                  <li>
                    <a>Farm Business</a>
                  </li>
                  <li>
                    <a>Farm Careers</a>
                  </li>
                  <li>
                    <a>Our Suppliers</a>
                  </li>
                  <li>
                    <a>Accessibility</a>
                  </li>
                  <li>
                    <a>Promotions</a>
                  </li>
                </ul>
              </div>
              <div className="footer-link-widget col   ">
                <h4 className="widget-title">Popular</h4>
                <ul className="footer-list mb-sm-5 mb-md-0">
                  <li>
                    <a>Milk &amp; Flavoured Milk</a>
                  </li>
                  <li>
                    <a>Butter and Margarine</a>
                  </li>
                  <li>
                    <a>Eggs Substitutes</a>
                  </li>
                  <li>
                    <a>Marmalades</a>
                  </li>
                  <li>
                    <a>Sour Cream and Dips</a>
                  </li>
                  <li>
                    <a>Tea &amp; Kombucha</a>
                  </li>
                  <li>
                    <a>Cheese</a>
                  </li>
                </ul>
              </div>
              <div className="footer-link-widget widget-install-app col   ">
                <h4 className="widget-title">Install App</h4>
                <p className="">From App Store or Google Play</p>
                <div className="download-app">
                  <a className="hover-up mb-sm-2 mb-lg-0">
                    <img className="active" src={AppleStore} alt="" />
                  </a>
                  <a className="hover-up mb-sm-2">
                    <img src={GGPlay} alt="" />
                  </a>
                </div>
                <p className="mb-20">Secured Payment Gateways</p>
                <img className="" src={PaymentImg} alt="" />
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
