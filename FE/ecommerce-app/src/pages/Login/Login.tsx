import "./Login.scss";
import LogoPage from "../../assets/images/banner-8.png";
import { useEffect, useState } from "react";
import { AuthService } from "../../services/auth/auth-service";
import { isSuccess } from "../../services/base-response";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/share/toast/Toast";
import { setCookie } from "../../services/cookie";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { fetch: login, response: loginResponse, loading: loginLoading } = AuthService.login();
  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const data = {
      email,
      password,
    };
    login(data);
  };
  useEffect(() => {
    if (loginResponse) {
      if (isSuccess(loginResponse)) {
        Toast.ToastSuccess("Đăng nhập thành công!");
        setCookie("data_user", JSON.stringify(loginResponse.data));
        setCookie("access_token", loginResponse.data.access_token);
        navigate("/home");
      } else {
        setError(loginResponse.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    }
  }, [loginResponse]);
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
                        <h1 className="mb-5">Đăng nhập</h1>
                        <p className="mb-30">
                          Bạn chưa có tài khoản? <a href="page-register.html">Tạo tài khoản tại đây</a>
                        </p>
                      </div>
                      <form onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                          <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                            Quên mật khẩu?
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
                          <button type="submit" disabled={loginLoading} className="  btn-heading btn-block  " name="login">
                            {loginLoading ? "Logging in..." : "Đăng nhập"}
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
