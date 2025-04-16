import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { HttpStatusCode } from "axios";
import Popup from "../../../components/share/Popup/Popup";
import Toast from "../../../components/share/Toast/Toast";
import { getAllChildCategory } from "../../../services/category/category-service";
import { getCookie } from "../../../services/cookie";
import { upload } from "../../../services/media/media-service";
import { createProduct } from "../../../services/product/product-service";
import { removeNonNumeric, formatCurrency } from "../../../utils/FormatCurrency";
import { CategoryResponse } from "../../../response/category";
import { MediaResponse } from "../../../response/media";

interface CreateProductProps {
  open: boolean;
  setIsOpenCreate: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
}

interface ProductFormValues {
  name: string;
  price: string;
  discount: number;
  unit: string;
  categoryId: number;
  description: string;
  quantity: number;
}

const CreateProductPopup: React.FC<CreateProductProps> = ({ open, setRefresh, setIsOpenCreate }) => {
  const [image, setImage] = useState<File[] | null>(null);
  const [listCategory, setListCategory] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState<string>("");
  // Use useRef instead of useState to avoid re-renders
  const formikRef = useRef<any>(null);

  const initialValues: ProductFormValues = {
    name: "",
    price: "100",
    discount: 0,
    unit: "",
    categoryId: -1,
    description: "",
    quantity: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    price: Yup.string().required("Vui lòng nhập giá sản phẩm"),
    discount: Yup.number().min(0, "Giảm giá không được nhỏ hơn 0").max(100, "Giảm giá không được lớn hơn 100%").required("Vui lòng nhập giảm giá"),
    unit: Yup.string().required("Vui lòng nhập đơn vị"),
    categoryId: Yup.number().min(0, "Vui lòng chọn danh mục").required("Vui lòng chọn danh mục"),
  });

  useEffect(() => {
    if (open) {
      const fetchDataListCategory = async () => {
        let response = await getAllChildCategory({
          status: 1,
          branch_id: JSON.parse(getCookie("data_user")).branch_id,
        });
        setListCategory(response.data);
      };
      fetchDataListCategory();
    }
  }, [open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setImage(selectedFiles);
      setError("");
    }
  };

  const handleDeleteImage = (index: number) => {
    if (image) {
      const updatedImages = image.filter((_, i) => i !== index);
      setImage(updatedImages.length > 0 ? updatedImages : null);
    }
  };

  const handleSubmit = async (values: ProductFormValues, { resetForm }: FormikHelpers<ProductFormValues>) => {
    try {
      if (!image || image.length === 0) {
        setError("Vui lòng chọn hình ảnh");
        return;
      }

      const responseMedia = await upload(image, 1);
      if (responseMedia.status === HttpStatusCode.Ok) {
        const default_media_id = responseMedia.data[0].id;
        const price_product = Number(removeNonNumeric(values.price));
        const list_media_id = responseMedia.data.map((md: MediaResponse) => md.id);
        const branch_id = JSON.parse(getCookie("data_user")).branch_id;

        // Update createProduct function to include discount and unit
        const response = await createProduct(
          values.name,
          values.description,
          values.categoryId,
          price_product,
          branch_id,
          default_media_id,
          list_media_id,
          values.discount,
          values.unit,
          values.quantity
        );

        if (response.status === HttpStatusCode.Ok) {
          Toast.ToastSuccess("Thêm sản phẩm thành công");
          setRefresh(true);
          resetForm();
          setImage(null);
          setError("");
          setIsOpenCreate(false);
        } else {
          setError(response.message);
        }
      } else {
        setError(responseMedia.message);
      }
    } catch (err) {
      setError("Thêm sản phẩm thất bại. Vui lòng thử lại.");
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
      title="Thêm sản phẩm"
      open={open}
      onClose={() => {
        setIsOpenCreate(false);
      }}
      onSubmit={handlePopupSubmit}
      submitText="Thêm mới"
      maxWidth="md"
    >
      <div className="card-body">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} innerRef={formikRef}>
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                  <label>Tên sản phẩm</label>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Tên sản phẩm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setError("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>

                  <label>Giá</label>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="price"
                      className="form-control"
                      placeholder="Giá"
                      value={values.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const numericValue = removeNonNumeric(e.target.value);
                        setFieldValue("price", formatCurrency(Number(numericValue)));
                        setError("");
                      }}
                    />
                    <ErrorMessage name="price" component="div" className="text-danger" />
                  </div>

                  <label>Giảm giá (%)</label>
                  <div className="mb-3">
                    <Field
                      type="number"
                      name="discount"
                      className="form-control"
                      placeholder="Giảm giá (%)"
                      min="0"
                      max="3"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value && Number(e.target.value) > 100) {
                          e.target.value = "100";
                        }
                        setError("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage name="discount" component="div" className="text-danger" />
                  </div>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6}>
                  <label>Đơn vị tính</label>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="unit"
                      className="form-control"
                      placeholder="Đơn vị tính (ví dụ: kg, cái, hộp)"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setError("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage name="unit" component="div" className="text-danger" />
                  </div>

                  <label>Thuộc danh mục</label>
                  <div className="mb-3">
                    <Field
                      as="select"
                      name="categoryId"
                      className="form-select"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setError("");
                        setFieldValue("categoryId", Number(e.target.value));
                      }}
                    >
                      <option value={-1}>Vui lòng chọn</option>
                      {listCategory && listCategory.length > 0 ? (
                        listCategory.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option disabled={true} key={-1} value={-1}>
                          Không tìm thấy danh mục
                        </option>
                      )}
                    </Field>
                    <ErrorMessage name="categoryId" component="div" className="text-danger" />
                  </div>
                  <label>Số lượng</label>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="quantity"
                      className="form-control"
                      placeholder="Số lượng"
                      value={values.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const numericValue = removeNonNumeric(e.target.value);
                        setFieldValue("quantity", formatCurrency(Number(numericValue)));
                        setError("");
                      }}
                    />
                    <ErrorMessage name="quantity" component="div" className="text-danger" />
                  </div>
                </Grid>
                <Grid item className="pt-0" md={12}>
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
                </Grid>

                {/* Full width for image section */}
                <Grid item xs={12}>
                  <label>Hình ảnh sản phẩm</label>
                  <Box className="d-flex align-items-center">
                    {image && (
                      <div>
                        <ul className="list-img">
                          {image.length > 0 &&
                            image.map((img, index) => (
                              <li key={index} className="item flex-column">
                                <div className="img">
                                  <img src={URL.createObjectURL(img)} alt={`Product image ${index}`} />
                                  <CloseIcon onClick={() => handleDeleteImage(index)} className="btn-delete bg-gradient-secondary" />
                                </div>
                                <div className="file-name">{img.name}</div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </Box>

                  <Button variant="contained" component="label" className="btn bg-gradient-info ml-1" fullWidth sx={{ marginTop: 2, width: "150px" }}>
                    {!image ? "Thêm ảnh" : "Thay đổi"}
                    <input type="file" multiple={true} accept="image/*" hidden onChange={handleImageChange} />
                  </Button>

                  {error && (
                    <p className="text-danger" style={{ margin: "10px 0" }}>
                      {error}
                    </p>
                  )}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Popup>
  );
};

export default CreateProductPopup;
