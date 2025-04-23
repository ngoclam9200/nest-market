import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Popup from "../../../components/share/Popup/Popup";
import Toast from "../../../components/share/Toast/Toast";
import { upload } from "../../../services/media/media-service";
import { ProductService } from "../../../services/product/product-service";
import { removeNonNumeric, formatCurrency } from "../../../utils/FormatCurrency";
import { CategoryResponse } from "../../../response/category";
import { MediaResponse } from "../../../response/media";
import { CategoryService } from "../../../services/category/category-service";
import { isSuccess } from "../../../services/base-response";

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
  brand: string;
  origin: string;
  expiry_date: string;
  storage_instructions:string
}

const CreateProductPopup: React.FC<CreateProductProps> = ({ open, setRefresh, setIsOpenCreate }) => {
  const [image, setImage] = useState<File[] | null>(null);
  const [listCategory, setListCategory] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState<string>("");
  // Use useRef instead of useState to avoid re-renders
  const formikRef = useRef<any>(null);
  const { fetch: getAllChildCategory, response: resCategory } = CategoryService.getAllChildCategory();
  const { fetch: createProduct, response: resCreate } = ProductService.createProduct();

  const initialValues: ProductFormValues = {
    name: "",
    price: "100",
    discount: 0,
    unit: "",
    categoryId: -1,
    description: "",
    quantity: 0,
    brand: "",
    origin: "",
    expiry_date: "",
    storage_instructions:""
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
      getAllChildCategory();
    }
  }, [open]);
  useEffect(() => {
    if (resCategory) {
      if (isSuccess(resCategory)) {
        setListCategory(resCategory.data);
      } else {
        Toast.ToastError(resCategory.message);
      }
    }
  });
  useEffect(() => {
    if (resCreate) {
      if (isSuccess(resCreate)) {
        Toast.ToastSuccess("Thêm sản phẩm thành công");
        setRefresh(true);
        setImage(null);
        setError("");
        setIsOpenCreate(false);
      } else {
        Toast.ToastError(resCreate.message);
      }
    }
  });

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

  const handleSubmit = async (values: ProductFormValues, {}: FormikHelpers<ProductFormValues>) => {
    if (!image || image.length === 0) {
      setError("Vui lòng chọn hình ảnh");
      return;
    }
    const responseMedia = await upload(image, 1);
    const default_media_id = responseMedia.data[0].id;
    const price_product = Number(removeNonNumeric(values.price));
    const list_media_id = responseMedia.data.map((md: MediaResponse) => md.id);
    createProduct({
      name: values.name,
      description: values.description,
      category_id: values.categoryId,
      price: price_product,
      default_media_id: default_media_id,
      list_media_id: list_media_id,
      discount: values.discount,
      unit: values.unit,
      quantity: values.quantity,
      brand: values.brand,
      origin: values.origin,
      expiry_date: values.expiry_date,
      storage_instructions:values.storage_instructions
    });
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

                  <label>Thương hiệu</label>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="brand"
                      className="form-control"
                      placeholder="Thương hiệu"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setError("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage name="brand" component="div" className="text-danger" />
                  </div>
                  <label>Nơi sản xuất</label>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="origin"
                      className="form-control"
                      placeholder="Nơi sản xuất"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setError("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage name="origin" component="div" className="text-danger" />
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
                      value={values.quantity}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const numericValue = removeNonNumeric(e.target.value);
                        setFieldValue("quantity", formatCurrency(Number(numericValue)));
                        setError("");
                      }}
                    />
                    <ErrorMessage name="quantity" component="div" className="text-danger" />
                  </div>

                  <label>Hạn sử dụng</label>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="expiry_date"
                      className="form-control"
                      placeholder="Hạn sử dụng"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setError("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage name="expiry_date" component="div" className="text-danger" />
                  </div>
                  <label>Bảo quản</label>
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="storage_instructions"
                      className="form-control"
                      placeholder="Bảo quản"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setError("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage name="storage_instructions" component="div" className="text-danger" />
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
