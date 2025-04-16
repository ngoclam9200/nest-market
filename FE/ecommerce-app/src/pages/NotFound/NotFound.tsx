import "./NotFound.scss";
import NotFoundImg from "../../assets/images/page-404.png";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const NotFound = () => {
  return (
    <>
      <section className="not-found">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 m-auto text-center pt-100 pb-100">
              <p className="mb-20">
                <img src={NotFoundImg} alt="" className="hover-up" />
              </p>
              <h1 className="display-2 mb-30">Page Not Found</h1>
              <p className="font-lg text-grey-700 mb-30">
                The link you clicked may be broken or the page may have been
                removed.
                <br />
                visit the
                <a>
                  <span className="text-brand"> Homepage</span>{" "}
                </a>
                or{" "}
                <a>
                  <span className="text-brand">Contact us</span>{" "}
                </a>
                about the problem
              </p>
              <Link to="home" className="btn">
                <HomeOutlinedIcon></HomeOutlinedIcon> Back to home page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
