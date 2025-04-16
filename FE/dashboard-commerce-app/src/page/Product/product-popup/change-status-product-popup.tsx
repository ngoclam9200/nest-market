import React from "react";
import Popup from "../../../components/share/Popup/Popup";
import { ProductResponse } from "../../../response/product";
import { changeStatusProduct } from "../../../services/product/product-service";
import { HttpStatusCode } from "axios";
import Toast from "../../../components/share/Toast/Toast";

interface ChangeStatusProductPopup {
  open: boolean;
  setIsOpenChangeStatus: (value: boolean) => void;
  product: ProductResponse;
  setRefresh: (value: boolean) => void;
}

const ChangeStatusProductPopup: React.FC<ChangeStatusProductPopup> = ({ open, setIsOpenChangeStatus, product, setRefresh }) => {
  const handleSubmit = async () => {
    try {
      let status = product.status === 0 ? 1 : 0;
      const response = await changeStatusProduct(product.id, status);
      if (response.status == HttpStatusCode.Ok) {
        product.status == 1 ? Toast.ToastSuccess("Tạm ngưng sản phẩm thành công") : Toast.ToastSuccess("Bật hoạt động sản phẩm thành công");
        setIsOpenChangeStatus(false);
        setRefresh(true);
      } else {
        Toast.ToastError(response.message);
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <Popup
      title=" Xác nhận"
      open={open}
      onClose={() => {
        setIsOpenChangeStatus(false);
      }}
      
      onSubmit={handleSubmit}
      submitText="Xác nhận"
      cancelText="Huỷ"
      maxWidth="xs"
      
    >
      <p>{product.status == 1 ? "Tạm ngưng sản phẩm này " : "Bật hoạt động sản phẩm này"}</p>
    </Popup>
  );
};

export default ChangeStatusProductPopup;
