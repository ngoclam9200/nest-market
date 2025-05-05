import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { HttpStatusCode } from "axios";
import Popup from "../../../components/share/Popup/Popup";
import Toast from "../../../components/share/Toast/Toast";
import { CategoryResponse } from "../../../response/category";
import { MediaResponse } from "../../../response/media";
import { upload } from "../../../services/media/media-service";
import { CategoryService } from "../../../services/category/category-service";
import { domainMedia, MODAL_TYPE } from "../../../enums/Enum";

// Define modal types


interface CategoryActionProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
  modalType: MODAL_TYPE;
  selectedCategory?: CategoryResponse;
}

interface CategoryFormValues {
  name: string;
  description: string;
  parent_id: number;
  media_id: number;
}

const CategoryActionPopup: React.FC<CategoryActionProps> = ({ open, setRefresh, setIsOpen, modalType, selectedCategory }) => {
  const [error, setError] = useState<string>("");
  const formikRef = useRef<any>(null);
  const [listParentCategories, setListParentCategories] = useState<CategoryResponse[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<MediaResponse[]>([]);

  const { fetch: createCategory, response: resCreate } = CategoryService.createCategory();
  const { fetch: updateCategory, response: resUpdate } = CategoryService.updateCategory();
  const { fetch: getCategoryParent, response: resCategoryparent } = CategoryService.getListParentCategory();

  // Set initial values based on modal type
  const initialValues: CategoryFormValues = {
    name: modalType === MODAL_TYPE.UPDATE && selectedCategory ? selectedCategory.name : "",
    description: modalType === MODAL_TYPE.UPDATE && selectedCategory ? selectedCategory.description : "",
    parent_id: modalType === MODAL_TYPE.UPDATE && selectedCategory ? selectedCategory.parent_id || 0 : 0,
    media_id: modalType === MODAL_TYPE.UPDATE && selectedCategory ? selectedCategory.media_id : 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên danh mục"),
    media_id: Yup.number().min(1, "Vui lòng chọn hình ảnh").required("Vui lòng chọn hình ảnh"),
  });

  useEffect(() => {
    if (open) {
      getCategoryParent({ status: 1 });

      // Set uploaded media if editing
      if (modalType === MODAL_TYPE.UPDATE && selectedCategory && selectedCategory.media) {
        setUploadedMedia([selectedCategory.media]);
      } else {
        setUploadedMedia([]);
      }
    }
  }, [open, modalType, selectedCategory]);

  useEffect(() => {
    if (resCategoryparent) {
      if (resCategoryparent.status === HttpStatusCode.Ok) {
        setListParentCategories(resCategoryparent.data);
      } else {
        Toast.ToastError(resCategoryparent.message);
      }
    }
  }, [resCategoryparent]);

  const handleSubmit = async (values: CategoryFormValues, {}: FormikHelpers<CategoryFormValues>) => {
    const categoryData = {
      name: values.name,
      description: values.description,
      parent_id: values.parent_id,
      media_id: values.media_id,
    };

    if (modalType === MODAL_TYPE.CREATE) {
      createCategory(categoryData);
    } else {
      if (selectedCategory) {
        updateCategory({ id: selectedCategory.id, ...categoryData });
      }
    }
  };

  useEffect(() => {
    const response = modalType === MODAL_TYPE.CREATE ? resCreate : resUpdate;

    if (response) {
      if (response.status === HttpStatusCode.Ok) {
        const actionText = modalType === MODAL_TYPE.CREATE ? "Tạo" : "Cập nhật";
        Toast.ToastSuccess(`${actionText} danh mục thành công`);
        setRefresh(true);
        setIsOpen(false);
      } else {
        Toast.ToastError(response.message);
      }
    }
  }, [resCreate, resUpdate]);

  // Handle media upload
  const handleUploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      // Convert FileList to File[] array
      const files: File[] = Array.from(e.target.files);

      // Call the upload service with the files array and type
      const response = await upload(files, 1);

      if (response.status === HttpStatusCode.Ok) {
        setUploadedMedia(response.data);
        if (formikRef.current) {
          formikRef.current.setFieldValue("media_id", response.data[0].id);
        }
      } else {
        setError("Không thể tải lên hình ảnh. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      setError("Không thể tải lên hình ảnh. Vui lòng thử lại.");
    }
  };

  // This function will be called when the Popup's submit button is clicked
  const handlePopupSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const popupTitle = modalType === MODAL_TYPE.CREATE ? "Tạo danh mục mới" : "Cập nhật danh mục";
  const submitText = modalType === MODAL_TYPE.CREATE ? "Tạo mới" : "Cập nhật";

  return (
    <Popup
      title={popupTitle}
      open={open}
      onClose={() => {
        setIsOpen(false);
      }}
      onSubmit={handlePopupSubmit}
      submitText={submitText}
    >
      <div className="card-body">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} innerRef={formikRef} enableReinitialize>
          {({ handleChange }) => (
            <Form>
              <label>Tên danh mục</label>
              <div className="mb-3">
                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Tên danh mục"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setError("");
                    handleChange(e);
                  }}
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <label>Danh mục cha</label>
              <div className="mb-3">
                <Field
                  as="select"
                  name="parent_id"
                  className="form-control"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setError("");
                    handleChange(e);
                  }}
                >
                  <option value="0">Không có danh mục cha</option>
                  {listParentCategories.map((parentCategory) => (
                    <option key={parentCategory.id} value={parentCategory.id}>
                      {parentCategory.name}
                    </option>
                  ))}
                </Field>
              </div>

              <label>Hình ảnh</label>
              <div className="mb-3">
                <input type="file" className="form-control" accept="image/*" onChange={handleUploadMedia} />
                <Field type="hidden" name="media_id" />
                <ErrorMessage name="media_id" component="div" className="text-danger" />

                {uploadedMedia.length > 0 && (
                  <div className="mt-2 " style={{width:"100px" , height:"100px"}}>
                    <img src={domainMedia + uploadedMedia[0].url} alt="Category preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                  </div>
                )}
              </div>

              <label>Mô tả</label>
              <div className="mb-3">
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                  placeholder="Mô tả"
                  rows={3}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setError("");
                    handleChange(e);
                  }}
                />
              </div>

              {error && (
                <p className="text-danger" style={{ margin: "10px 0" }}>
                  {error}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Popup>
  );
};

export default CategoryActionPopup;
