import "./Login.scss";
import LogoPage from "../../assets/images/banner-8.png";
import { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // try {
    // Gọi hàm đăng nhập từ authService
    //   const response = await login(email, password);
    //   if (response.status == HttpStatusCode.Ok) {
    //     setCookie("data_user", JSON.stringify(response.data));
    //     setCookie("access_token", response.data.access_token);
    //     navigate("/");
    //   } else {
    //     setError(response.message);
    //   }
    // } catch (err) {
    //   setError("Login failed. Please check your credentials.");
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <>
      <div className="page-content pt-150 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
              <div className="row">
                <div className="col-lg-6 pr-30 d-none d-lg-block">
                  <img className="border-radius-15 h-100" src={LogoPage} alt="" />
                </div>
                <div className="col-lg-6 col-md-8">
                  <div className="login_wrap widget-taber-content background-white">
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h1 className="mb-5">Login</h1>
                        <p className="mb-30">
                          Don't have an account? <a href="page-register.html">Create here</a>
                        </p>
                      </div>
                      <form onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                          <input type="text" name="email" placeholder="Username or Email *" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" placeholder="Your password *" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div className="login_footer form-group mb-50">
                          <div className="chek-form">
                            <div className="custome-checkbox">
                              <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1" value="" />
                              <label className="form-check-label">
                                <span>Remember me</span>
                              </label>
                            </div>
                          </div>
                          <a className="text-muted" href="#">
                            Forgot password?
                          </a>
                        </div>
                        <div className="form-group">
                          {error && (
                            <p
                              className="mb-10"
                              style={{
                                color: "red",
                                marginBottom: "10px !important",
                              }}
                            >
                              {error}
                            </p>
                          )}
                          <button type="submit" disabled={loading} className="  btn-heading btn-block  " name="login">
                            {loading ? "Logging in..." : "Login"}
                          </button>
                        </div>
                      </form>
                    </div>
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

export default Login;
