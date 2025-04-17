import React, { useEffect } from "react";
import Popup from "../../../components/share/Popup/Popup";
import { ProductResponse } from "../../../response/product";
import Toast from "../../../components/share/Toast/Toast";
import { ProductService } from "../../../services/product/product-service";
import { isSuccess } from "../../../services/base-response";

interface ChangeStatusProductPopup {
  open: boolean;
  setIsOpenChangeStatus: (value: boolean) => void;
  product: ProductResponse;
  setRefresh: (value: boolean) => void;
}

const ChangeStatusProductPopup: React.FC<ChangeStatusProductPopup> = ({ open, setIsOpenChangeStatus, product, setRefresh }) => {
  const { fetch: changeStatusProduct, response: resChangeStatus } = ProductService.changeStatusProduct();
  const handleSubmit = async () => {
    changeStatusProduct({ id: product.id, status: product.status === 1 ? 0 : 1 });
  };
  useEffect(() => {
    if (resChangeStatus) {
      if (isSuccess(resChangeStatus)) {
        product.status == 1 ? Toast.ToastSuccess("Tạm ngưng sản phẩm thành công") : Toast.ToastSuccess("Bật hoạt động sản phẩm thành công");
        setIsOpenChangeStatus(false);
        setRefresh(true);
      } else {
        Toast.ToastError(resChangeStatus.message);
      }
    }
  }, [resChangeStatus]);

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
