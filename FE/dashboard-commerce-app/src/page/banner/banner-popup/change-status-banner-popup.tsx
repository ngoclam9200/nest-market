import React, { useEffect } from "react";
import Popup from "../../../components/share/Popup/Popup";
import { BannerResponse } from "../../../response/banner";
import Toast from "../../../components/share/Toast/Toast";
import { BannerService } from "../../../services/banner/banner-service";
import { isSuccess } from "../../../services/base-response";

interface ChangeStatusBannerPopup {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  banner: BannerResponse;
  setRefresh: (value: boolean) => void;
}

const CreateBannerPopup: React.FC<ChangeStatusBannerPopup> = ({ open, setIsOpen, banner, setRefresh }) => {
  const { fetch: changeStatusBanner, response: resChangeStatus } = BannerService.changeStatusBanner();
  const handleSubmit = async () => {
    let status = banner.status == 0 ? 1 : 0;

    changeStatusBanner({ id: banner.id, status: status });
  };
  useEffect(() => {
    if (resChangeStatus) {
      if (isSuccess(resChangeStatus)) {
        Toast.ToastSuccess("Thay đổi trạng thái thành công");
        setIsOpen(false);
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
        setIsOpen(false);
      }}
      onSubmit={handleSubmit}
      submitText="Xác nhận"
      cancelText="Huỷ"
      maxWidth="sm"
    >
      <p>{banner.status == 1 ? "Tạm ngưng banner này " : "Bật hoạt động banner này"}</p>
    </Popup>
  );
};

export default CreateBannerPopup;
