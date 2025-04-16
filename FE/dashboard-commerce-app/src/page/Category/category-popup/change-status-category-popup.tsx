import React, { useEffect } from "react";
import Popup from "../../../components/share/Popup/Popup";
import { CategoryResponse } from "../../../response/category";
import Toast from "../../../components/share/Toast/Toast";
import { CategoryService } from "../../../services/category/category-service";
import { isSuccess } from "../../../services/base-response";

interface ChangeStatusCategoryPopup {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  category: CategoryResponse;
  setRefresh: (value: boolean) => void;
}

const CreateCategoryPopup: React.FC<ChangeStatusCategoryPopup> = ({ open, setIsOpen, category, setRefresh }) => {
  const { fetch: changeStatusCategory, response: resChangeStatus } = CategoryService.changeStatusCategory();
  const handleSubmit = async () => {
    let status = category.status == 0 ? 1 : 0;

    changeStatusCategory({ id: category.id, status: status });
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
      <p>{category.status == 1 ? "Tạm ngưng danh mục này " : "Bật hoạt động danh mục này"}</p>
    </Popup>
  );
};

export default CreateCategoryPopup;
