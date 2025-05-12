import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import LogoFB from "../../assets/images/logo-facebook.svg";
import LogoGG from "../../assets/images/logo-google.svg";
import LogoPage from "../../assets/images/logo.svg";
import { AuthService } from "../../services/auth/auth-service";
import { isSuccess } from "../../services/base-response";
import Toast from "../../components/share/toast/Toast";
import { setCookie } from "../../services/cookie";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showGoogleLogin, setShowGoogleLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const { fetch: register, response: registerResponse, loading: registerLoading } = AuthService.register();
  const { fetch: loginGoogle, response: loginGoogleResponse } = AuthService.loginGoogle();

  useEffect(() => {
    if (registerResponse) {
      if (isSuccess(registerResponse)) {
        Toast.ToastSuccess("Đăng ký thành công!");
        setCookie("data_user", JSON.stringify(registerResponse.data));
        setCookie("access_token", registerResponse.data.access_token);
        navigate("/login");
      } else {
        setError(registerResponse.message || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    }
  }, [registerResponse, navigate]);

  useEffect(() => {
    if (loginGoogleResponse) {
      if (isSuccess(loginGoogleResponse)) {
        Toast.ToastSuccess("Đăng nhập thành công!");
        setCookie("data_user", JSON.stringify(loginGoogleResponse.data));
        setCookie("access_token", loginGoogleResponse.data.access_token);
        navigate("/home");
      } else {
        setError(loginGoogleResponse.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    }
  }, [loginGoogleResponse]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Validate form
    if (!username || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    // Call register API
    register({
      username,
      email,
      password,
    });
  };

  const handleGoogleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowGoogleLogin(true);
    // Trigger the Google login popup
    setTimeout(() => {
      const googleLoginButton = document.querySelector('[aria-labelledby="button-label"]');
      if (googleLoginButton) {
        (googleLoginButton as HTMLElement).click();
      }
    }, 100);
  };

  return (
    <>
      <div className="page-content pt-50 ">
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
                        <h1 className="mb-5">Tạo tài khoản</h1>
                        <p className="mb-30">
                          Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                        </p>
                      </div>
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      <form method="post" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input type="text" name="username" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-group mt-30 mb-30">
                          <button type="submit" className="btn btn-fill-out btn-block hover-up font-weight-bold" name="register" disabled={registerLoading}>
                            {registerLoading ? "Đang xử lý..." : "Đăng ký"}
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
                    <a href="#" className="social-login google-login" onClick={handleGoogleLoginClick}>
                      <img src={LogoGG} alt="" />
                      <span>Continue with Google</span>
                    </a>
                    {showGoogleLogin && (
                      <div style={{ display: "none" }}>
                        <GoogleLogin
                          onSuccess={(credentialResponse: any) => {
                            console.log(credentialResponse);
                            loginGoogle({ credential: credentialResponse.credential });
                            // Handle the Google login response here
                            // You can call your backend API to verify the token
                            // and register/login the user
                            setShowGoogleLogin(false);
                          }}
                          onError={() => {
                            console.log("Login Failed");
                            Toast.ToastError("Đăng nhập Google thất bại");
                            setShowGoogleLogin(false);
                          }}
                        />
                      </div>
                    )}
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
