// import React from "react";
// import Popup from "../../../components/share/Popup/Popup";
// import { changeStatusCategory } from "../../../services/Category/CategoryService";
// import { ICategory } from "../../../interface/ICategory";
// import { HttpStatusCode } from "../../../enums/Enum";
// import Toast from "../../../components/share/Toast/Toast";
// import { updateCategoryStore } from "../../../store/thunks/CategoryThunk";
// import { useAppDispatch } from "../../../store/store";

// interface ChangeStatusCategoryPopup {
//   open: boolean;
//   onClose: () => void;
//   category: ICategory;
//   currentPage: number;
// }

// const CreateCategoryPopup: React.FC<ChangeStatusCategoryPopup> = ({
//   open,
//   onClose,
//   category,
//   currentPage,
// }) => {
//   const dispatch = useAppDispatch();

//   const handleSubmit = async () => {
//     try {
//       let status = category.status == 0 ? 1 : 0;
//       const response = await changeStatusCategory(category.id, status);
//       if (response.status == HttpStatusCode.Ok) {
//         dispatch(updateCategoryStore(response.data, currentPage));
//         category.status == 1
//           ? Toast.ToastSuccess("Tạm ngưng danh mục thành công")
//           : Toast.ToastSuccess("Bật hoạt động danh mục thành công");
//         onClose();
//       } else {
//         Toast.ToastError(response.message);
//       }
//     } catch (err) {
//     } finally {
//     }
//   };

//   return (
//     <Popup
//       title=" Xác nhận"
//       open={open}
//       onClose={onClose}
//       onSubmit={handleSubmit}
//       submitText="Xác nhận"
//       cancelText="Huỷ"
//       maxWidth="md"
//     >
//       <p>
//         {category.status == 1
//           ? "Tạm ngưng danh mục này "
//           : "Bật hoạt động danh mục này"}
//       </p>
//     </Popup>
//   );
// };

// export default CreateCategoryPopup;
