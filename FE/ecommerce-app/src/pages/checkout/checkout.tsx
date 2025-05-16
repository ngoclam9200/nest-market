import { useLocation, useNavigate } from "react-router-dom";
import { domainMedia } from "../../enums/Enum";
import { CartItem } from "../../store/reducers/cart-reducer";
import { formatCurrencyDecimal } from "../../utils/helpers";
import LocationOn from "@mui/icons-material/LocationOn";
import { UserAddressService } from "../../services/user-address/user-address-service";
import { useEffect, useState } from "react";
import { isSuccess } from "../../services/base-response";
import { UserAddressResponse } from "../../response/user-address";
import { UserResponse } from "../../response/user";
import Cookies from "js-cookie";
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itemsCart = location.state?.cartItems;
  const cartTotal = location.state?.cartTotal;
  const [addressDefault, setAddressDefault] = useState<UserAddressResponse>(new UserAddressResponse());
  const { fetch: getUserAddressDefault, response: userAddressDefaultResponse } = UserAddressService.getUserAddressDefault();
  if (!itemsCart) {
    navigate("/");
  }
  const dataUser = JSON.parse(Cookies.get("data_user") || "");
  useEffect(() => {
    getUserAddressDefault();
  }, []);
  useEffect(() => {
    if (userAddressDefaultResponse) {
      if (isSuccess(userAddressDefaultResponse)) {
        setAddressDefault(userAddressDefaultResponse.data);
      }
    }
  }, [userAddressDefaultResponse]);

  return (
    <>
      <div className="container-fluid flex flex-col">
        <div className="bg-white flex items-center gap-4 border-b-1 border-gray-200 py-4">
          <div className=" text-uppercase" style={{ color: "#3bb77e ", fontSize: "24px" }}>
            Thanh Toán Đơn Hàng
          </div>
        </div>
        <div className="bg-white  border-b-1 border-gray-200 py-4">
          <div className="flex items-center gap-1">
            <LocationOn style={{ color: "#3bb77e ", fontSize: "25px" }} />
            <div className="" style={{ color: "#3bb77e ", fontSize: "18px" }}>
              Địa chỉ nhận hàng
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center" style={{ marginLeft: "30px" }}>
            <div className="font-bold">
              {dataUser?.username} {dataUser?.phone}{" "}
            </div>
            <div> {addressDefault.address}</div>
            <div className="text-orange-400  border-2 border-orange-200 px-3 py-1 rounded ">Mặc định</div>
            <div className="text-brand">Thay đổi</div>
          </div>
        </div>

        <div>
          <table className="table table-wishlist">
            <thead>
              <tr className="main-heading">
                <th className="text-left" scope="col">
                  Sản phẩm
                </th>
                <th className="text-center" scope="col">
                  Giá{" "}
                </th>
                <th className="text-center" scope="col">
                  Số lượng
                </th>
                <th className="text-center" scope="col">
                  Tổng
                </th>
              </tr>
            </thead>
            <tbody>
              {itemsCart.map((item: CartItem) => (
                <tr className="pt-30 " key={item.product.id}>
                  <td className="image product-thumbnail   text-center" style={{ verticalAlign: "middle" }}>
                    <div className="flex gap-2 items-center">
                      <img
                        className="rounded"
                        style={{ width: "50px", height: "50px" }}
                        src={item.product.media && item.product.media.length > 0 ? domainMedia + item.product.media[0].url : ""}
                        alt={item.product.name}
                      />
                      {item.product.name}
                    </div>
                  </td>
                  <td className="text-center middle" data-title="Price" style={{ verticalAlign: "middle" }}>
                    {formatCurrencyDecimal(item.product.price * (1 - item.product.discount / 100))}
                  </td>
                  <td className="text-center detail-info" data-title="Stock" style={{ verticalAlign: "middle" }}>
                    {item.quantity}
                  </td>
                  <td className="  text-center" data-title="Price" style={{ verticalAlign: "middle" }}>
                    {formatCurrencyDecimal(item.product.price * (1 - item.product.discount / 100) * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white  border-b-1 border-gray-200 py-4">
          <div className="flex items-center gap-4">
            <div className="">Lời nhắn</div>
            <input style={{ height: "40px", width: "500px" }} className="w-full"></input>
          </div>
        </div>
        <div className="bg-white  border-b-1 border-gray-200 py-4">
          <div className="flex  gap-4">
            <div className="w-[70%] " style={{ fontSize: "20px" }}>
              Phương thức thanh toán
            </div>
            <div className="w-[30%] flex  justify-end gap-2">
              Thanh toán khi nhận hàng {"  "}
              <span className="text-brand pl-2">Thay đổi</span>{" "}
            </div>
          </div>
        </div>

        <div className="bg-white  border-b-1 border-gray-200 py-4">
          <div className="flex    gap-4">
            <div className="w-[70%] "></div>
            <div className="w-[30%] flex-col flex gap-2" style={{ fontSize: "17px" }}>
              <div className="flex  justify-between">
                Tổng tiền hàng {"  "}
                <div className="  pl-2 text-right"> {formatCurrencyDecimal(cartTotal)} </div>{" "}
              </div>
              <div className="flex  justify-between">
                {" "}
                Tổng tiền vận chuyển<nav></nav> {"  "}
                <span className="  pl-2"> {formatCurrencyDecimal(0)} </span>{" "}
              </div>
              <div className="flex  justify-between">
                {" "}
                Tổng tiền {"  "}
                <span className="text-brand pl-2" style={{ fontSize: "20px" }}>
                  {" "}
                  {formatCurrencyDecimal(cartTotal)}{" "}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white  border-b-1 border-gray-200 py-4">
          <div className="flex  gap-4 items-center">
            <div className="w-[70%] " style={{ fontSize: "15px" }}>
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Nest market
            </div>
            <div className="w-[30%] flex  justify-end">
              <div className="btn  w-100">Đặt hàng</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
