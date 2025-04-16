import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { HttpStatusCode } from "axios";
import Popup from "../../../components/share/Popup/Popup";
import Toast from "../../../components/share/Toast/Toast";
import {  updateCategory, getListParentCategory } from "../../../services/category/category-service";
import { CategoryResponse } from "../../../response/category";
import { getCookie } from "../../../services/cookie";
import { MediaResponse } from "../../../response/media";
import { upload } from "../../../services/media/media-service";

interface UpdateCategoryProps {
  open: boolean;
  setIsOpenUpdate: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
  category: CategoryResponse | null;
}

interface CategoryFormValues {
  name: string;
  description: string;
  parent_id?: number;
  media_id: number;
}

const UpdateCategoryPopup: React.FC<UpdateCategoryProps> = ({ open, setRefresh, setIsOpenUpdate, category }) => {
  const [error, setError] = useState<string>("");
  const formikRef = useRef<any>(null);
  const [listParentCategories, setListParentCategories] = useState<CategoryResponse[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<MediaResponse[]>([]);

  // Initialize form values from category data
  const getInitialValues = (): CategoryFormValues => {
    if (!category) {
      return {
        name: "",
        description: "",
        parent_id: 0,
        media_id: 0,
      };
    }

    return {
      name: category.name || "",
      description: category.description || "",
      parent_id: category.parent_id || 0,
      media_id: category.media?.id || 0,
    };
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên danh mục"),
    media_id: Yup.number().min(1, "Vui lòng chọn hình ảnh").required("Vui lòng chọn hình ảnh"),
  });

  useEffect(() => {
    if (open) {
      const fetchParentCategories = async () => {
        try {
          const response = await getListParentCategory({
            status: 1,
            branch_id: JSON.parse(getCookie("data_user")).branch_id,
          });
          setListParentCategories(response.data);
        } catch (error) {
          console.error("Error fetching parent categories:", error);
        }
      };

      fetchParentCategories();
    }
  }, [open, category]);

  // Handle media upload
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

  const handleSubmit = async (values: CategoryFormValues, { setSubmitting }: FormikHelpers<CategoryFormValues>) => {
    try {
      if (!category) {
        setError("Không tìm thấy thông tin danh mục");
        return;
      }

      const response = await updateCategory(category.id, values.name, values.description, JSON.parse(getCookie("data_user")).branch_id, values.media_id);

      if (response.status === HttpStatusCode.Ok) {
        Toast.ToastSuccess("Cập nhật danh mục thành công");
        setRefresh(true);
        setIsOpenUpdate(false);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Cập nhật danh mục thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  // This function will be called when the Popup's submit button is clicked
  const handlePopupSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  return (
    <Popup
      title="Cập nhật danh mục"
      open={open}
      onClose={() => {
        setIsOpenUpdate(false);
      }}
      onSubmit={handlePopupSubmit}
      submitText="Cập nhật"
    >
      <div className="card-body">
        <Formik initialValues={getInitialValues()} validationSchema={validationSchema} onSubmit={handleSubmit} innerRef={formikRef} enableReinitialize={true}>
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
                  {listParentCategories.map((parentCategory) =>
                    // Don't allow selecting the current category as its own parent
                    category && parentCategory.id !== category.id ? (
                      <option key={parentCategory.id} value={parentCategory.id}>
                        {parentCategory.name}
                      </option>
                    ) : null
                  )}
                </Field>
              </div>

              <label>Hình ảnh</label>
              <div className="mb-3">
                <input type="file" className="form-control" accept="image/*" onChange={handleUploadMedia} />
                <Field type="hidden" name="media_id" />
                <ErrorMessage name="media_id" component="div" className="text-danger" />

                {uploadedMedia.length > 0 && (
                  <div className="mt-2">
                    <img src={uploadedMedia[0].url} alt="Category preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
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

export default UpdateCategoryPopup;
