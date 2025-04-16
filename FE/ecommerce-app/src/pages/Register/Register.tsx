import "./Register.scss";
import LogoFB from '../../assets/images/logo-facebook.svg'
import LogoGG from "../../assets/images/logo-google.svg";
import LogoPage from '../../assets/images/logo.svg';

const Register = () => {
  return (
    <>
      <div className="page-content pt-100 pb-150">
        <div className="container-fluid">
            <div className="logo-page d-flex justify-content-center pb-50">
                <img src={LogoPage} alt="" />
            </div>
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
              <div className="row">
                <div className="col-lg-6 col-md-8">
                  <div className="login_wrap widget-taber-content background-white">
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h1 className="mb-5">Create an Account</h1>
                        <p className="mb-30">
                          Already have an account?{" "}
                          <a href="page-login.html">Login</a>
                        </p>
                      </div>
                      <form method="post">
                        <div className="form-group">
                          <input
                            type="text"
                            name="username"
                            placeholder="Username"
                          />
                        </div>
                        <div className="form-group">
                          <input type="text" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            placeholder="Confirm password"
                          />
                        </div>

                        <div className="form-group mt-30 mb-30">
                          <button
                            type="submit"
                            className="btn btn-fill-out btn-block hover-up font-weight-bold"
                            name="login"
                          >
                            Submit &amp; Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 pr-30 d-none d-lg-block">
                  <div className="card-login mt-115">
                    <a href="#" className="social-login facebook-login">
                      <img src={LogoFB} alt="" />
                      <span>Continue with Facebook</span>
                    </a>
                    <a href="#" className="social-login google-login">
                      <img src={LogoGG} alt="" />
                      <span>Continue with Google</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
