import { useEffect, useState } from "react";
import { deleteCookie, setCookie } from "../../../services/cookie";
import { AuthService } from "../../../services/auth/auth-service";
import { isSuccess } from "../../../services/base-response";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { fetch: onLogin, response: resLogin, loading: loading } = AuthService.login();

  useEffect(() => {
    deleteCookie("access_token");
    deleteCookie("data_user");
  }, []);

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      onLogin({ email, password });
    } catch (err) {
      setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập của bạn.");
    }
  };
  useEffect(() => {
    if (resLogin) {
      if (isSuccess(resLogin)) {
        setCookie("data_user", JSON.stringify(resLogin.data));
        setCookie("access_token", resLogin.data.access_token);
        navigate("/");
      } else {
        setError(resLogin.message);
      }
    }
  }, [resLogin]);
  return (
    <>
      <main className="main-content login  mt-0 h-100" id="login-container">
        <section className="h-100">
          <div className="page-header min-vh-75 h-100">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                      <p className="mb-0">Nhập email và mật khẩu của bạn để đăng nhập</p>
                    </div>
                    <div className="card-body">
                      <form role="form" onSubmit={handleSubmitLogin}>
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="email-addon"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <label>Mật khẩu</label>
                        <div className="mb-2">
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="">
                          <label className="error-text-sign-up"> {error}</label>
                        </div>

                        {/* <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div> */}

                        <div className="form-check form-switch">
                          <input style={{ minWidth: "0px !important", height: "20px !important" }} className="form-check-input" type="checkbox" id="rememberMe" />
                          <label className="form-check-label">Lưu thông tin đăng nhập</label>
                        </div>
                        <div className="text-center">
                          <button disabled={loading} type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div
                      className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                      style={{
                        backgroundImage: "url('./src/assets/img/curved-images/curved6.jpg')",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
