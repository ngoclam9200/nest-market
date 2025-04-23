import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { HttpStatusCode } from "axios";
import Popup from "../../../components/share/Popup/Popup";
import Toast from "../../../components/share/Toast/Toast";
import { upload } from "../../../services/media/media-service";
import { ProductService } from "../../../services/product/product-service";
import { removeNonNumeric, formatCurrency } from "../../../utils/FormatCurrency";
import { CategoryResponse } from "../../../response/category";
import { MediaResponse } from "../../../response/media";
import { ProductResponse } from "../../../response/product";
import { CategoryService } from "../../../services/category/category-service";
import { isSuccess } from "../../../services/base-response";

interface UpdateProductProps {
  open: boolean;
  setIsOpenUpdate: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
  productId: number;
}

interface ProductFormValues {
  id: number;
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
  storage_instructions: string;
}

const UpdateProductPopup: React.FC<UpdateProductProps> = ({ open, setRefresh, setIsOpenUpdate, productId }) => {
  const [image, setImage] = useState<File[] | null>(null);
  const [existingImages, setExistingImages] = useState<MediaResponse[]>([]);
  const [listCategory, setListCategory] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState<string>("");

  const [productData, setProductData] = useState<ProductResponse>(new ProductResponse());
  const formikRef = useRef<any>(null);
  const domainMedia = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_MEDIA_PORT + "/";

  const { fetch: getAllChildCategory, response: listCategoryResponse } = CategoryService.getAllChildCategory();
  const { fetch: getDetailProduct, response: resDetail, loading: loading } = ProductService.getDetailProduct();
  const { fetch: updateProduct, response: resUpdate } = ProductService.updateProduct();

  const initialValues: ProductFormValues = {
    id: productData?.id || 0,
    name: productData?.name || "",
    price: productData?.price ? formatCurrency(productData.price) : "0",
    discount: productData?.discount || 0,
    unit: productData?.unit || "",
    categoryId: productData?.category.id || -1,
    description: productData?.description || "",
    quantity: productData?.quantity || 0,
    brand: productData?.brand || "",
    origin: productData?.origin || "",
    expiry_date: productData?.expiry_date || "",
    storage_instructions: productData?.storage_instructions || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    price: Yup.string().required("Vui lòng nhập giá sản phẩm"),
    discount: Yup.number().min(0, "Giảm giá không được nhỏ hơn 0").max(100, "Giảm giá không được lớn hơn 100%").required("Vui lòng nhập giảm giá"),
    unit: Yup.string().required("Vui lòng nhập đơn vị tính"),
    categoryId: Yup.number().min(0, "Vui lòng chọn danh mục").required("Vui lòng chọn danh mục"),
  });

  useEffect(() => {
    if (open && productId) {
      getDetailProduct(productId);
      getAllChildCategory();
    }
  }, [open, productId]);

  useEffect(() => {
    if (listCategoryResponse) {
      if (isSuccess(listCategoryResponse)) {
        setListCategory(listCategoryResponse.data);
      } else {
        Toast.ToastError(listCategoryResponse.message);
      }
    }
  }, [listCategoryResponse]);
  useEffect(() => {
    if (resDetail) {
      if (isSuccess(resDetail)) {
        setProductData(resDetail.data);

        // Set existing images if available
        if (resDetail.data.media && resDetail.data.media.length > 0) {
          setExistingImages(resDetail.data.media);
        }
      } else {
        Toast.ToastError(resDetail.message);
      }
    }
  }, [resDetail]);

  useEffect(() => {
    if (resUpdate) {
      if (isSuccess(resUpdate)) {
        Toast.ToastSuccess("Cập nhật sản phẩm thành công");
        setRefresh(true);

        setImage(null);
        setExistingImages([]);
        setError("");
        setIsOpenUpdate(false);
      } else {
        Toast.ToastError(resUpdate.message);
      }
    }
  }, [resUpdate]);

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

  const handleDeleteExistingImage = (index: number) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedImages);
  };

  const handleSubmit = async (values: ProductFormValues, {}: FormikHelpers<ProductFormValues>) => {
    if (!existingImages.length && (!image || image.length === 0)) {
      setError("Vui lòng chọn hình ảnh");
      return;
    }

    let list_media_id = existingImages.map((media) => media.id);

    // Upload new images if any
    if (image && image.length > 0) {
      const responseMedia = await upload(image, 1);
      if (responseMedia.status === HttpStatusCode.Ok) {
        const new_media_ids = responseMedia.data.map((md: MediaResponse) => md.id);
        list_media_id = [...list_media_id, ...new_media_ids];
      } else {
        setError(responseMedia.message);
        return;
      }
    }

    const price_product = Number(removeNonNumeric(values.price));
    updateProduct({
      id: values.id,
      name: values.name,
      description: values.description,
      category_id: values.categoryId,
      discount: values.discount,
      unit: values.unit,
      price: price_product,
      quantity: values.quantity,
      list_media_id: list_media_id,
      brand: values.brand,
      origin: values.origin,
      expiry_date: values.expiry_date,
      storage_instructions: values.storage_instructions,
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
      title="Cập nhật sản phẩm"
      open={open}
      onClose={() => {
        setIsOpenUpdate(false);
      }}
      onSubmit={handlePopupSubmit}
      submitText="Cập nhật"
      maxWidth="md"
    >
      <div className="card-body">
        {loading ? (
          <div className="text-center">
            <p>Đang tải thông tin sản phẩm...</p>
          </div>
        ) : (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} innerRef={formikRef} enableReinitialize={true}>
            {({ values, handleChange, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
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
                        max="100"
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
                        values={values.brand}
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
                        values={values.origin}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setError("");
                          handleChange(e);
                        }}
                      />
                      <ErrorMessage name="origin" component="div" className="text-danger" />
                    </div>
                  </Grid>

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
                        value={values.expiry_date}
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
                        value={values.storage_instructions}
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

                  <Grid item xs={12}>
                    {/* <h6>Hình ảnh sản phẩm</h6> */}

                    {/* Existing images */}
                    {existingImages && existingImages.length > 0 && (
                      <Box className="d-flex align-items-center mb-3">
                        <div>
                          <label>Hình ảnh hiện tại</label>
                          <ul className="list-img">
                            {existingImages.map((img, index) => (
                              <li key={index} className="item flex-column">
                                <div className="img">
                                  <img src={domainMedia + img.url} alt={`Product image ${index}`} />
                                  <CloseIcon onClick={() => handleDeleteExistingImage(index)} className="btn-delete bg-gradient-secondary" />
                                </div>
                                <div className="file-name">Ảnh {index + 1}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Box>
                    )}

                    {/* New images */}
                    {image && image.length > 0 && (
                      <Box className="d-flex align-items-center mb-3">
                        <div>
                          <h6>Hình ảnh mới</h6>
                          <ul className="list-img">
                            {image.map((img, index) => (
                              <li key={index} className="item flex-column">
                                <div className="img">
                                  <img src={URL.createObjectURL(img)} alt={`New product image ${index}`} />
                                  <CloseIcon onClick={() => handleDeleteImage(index)} className="btn-delete bg-gradient-secondary" />
                                </div>
                                <div className="file-name">{img.name}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Box>
                    )}

                    <Button variant="contained" component="label" className="btn bg-gradient-info ml-1" sx={{ marginTop: 2, width: "150px" }}>
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
        )}
      </div>
    </Popup>
  );
};

export default UpdateProductPopup;
