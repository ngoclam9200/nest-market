import "./not-found.scss";
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
              <p className="mb-20 d-flex justify-content-center">
                <img src={NotFoundImg} alt="" className="hover-up" />
              </p>
              <h1 className="display-2 mb-30">Page Not Found</h1>
              <p className="font-lg text-grey-700 mb-30">
                Liên kết bạn vừa truy cập có thể không còn tồn tại.
                <br />Vui lòng quay lại
                <a href="/home">
                  <span className="text-brand"> Trang chủ</span>{" "}
                </a>
                hoặc{" "}
                <a href="/contact">
                  <span className="text-brand">Liên hệ với chúng tôi</span>{" "}
                </a>
                để được hỗ trợ.
              </p>
              <Link to="home" className="btn">
                <HomeOutlinedIcon></HomeOutlinedIcon> Trở về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
