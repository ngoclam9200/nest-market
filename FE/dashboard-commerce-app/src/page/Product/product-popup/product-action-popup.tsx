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
import { CategoryResponse } from "../../../response/category";
import { MediaResponse } from "../../../response/media";
import { ProductResponse } from "../../../response/product";
import { CategoryService } from "../../../services/category/category-service";
import { isSuccess } from "../../../services/base-response";
import { domainMedia, MODAL_TYPE } from "../../../enums/Enum";
import { formatCurrencyDecimal } from "../../../utils/helpers";

// Define modal types

interface ProductActionProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
  modalType: MODAL_TYPE;
  product?: ProductResponse;
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

const ProductActionPopup: React.FC<ProductActionProps> = ({ open, setRefresh, setIsOpen, modalType, product }) => {
  const [image, setImage] = useState<File[] | null>(null);
  const [existingImages, setExistingImages] = useState<MediaResponse[]>([]);
  const [listCategory, setListCategory] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState<string>("");
  const [productData, setProductData] = useState<ProductResponse>(new ProductResponse());
  const formikRef = useRef<any>(null);

  const { fetch: getAllChildCategory, response: resCategory } = CategoryService.getAllChildCategory();
  const { fetch: getDetailProduct, response: resDetail, loading: loading } = ProductService.getDetailProduct();
  const { fetch: createProduct, response: resCreate } = ProductService.createProduct();
  const { fetch: updateProduct, response: resUpdate } = ProductService.updateProduct();

  // Set initial values based on modal type
  const initialValues: ProductFormValues = {
    id: modalType === MODAL_TYPE.UPDATE && productData ? productData.id || 0 : 0,
    name: modalType === MODAL_TYPE.UPDATE && productData ? productData.name || "" : "",
    price: modalType === MODAL_TYPE.UPDATE && productData ? (productData.price ? formatCurrencyDecimal(productData.price) : "0") : "100",
    discount: modalType === MODAL_TYPE.UPDATE && productData ? productData.discount || 0 : 0,
    unit: modalType === MODAL_TYPE.UPDATE && productData ? productData.unit || "" : "",
    categoryId: modalType === MODAL_TYPE.UPDATE && productData ? (productData.category ? productData.category.id || -1 : -1) : -1,
    description: modalType === MODAL_TYPE.UPDATE && productData ? productData.description || "" : "",
    quantity: modalType === MODAL_TYPE.UPDATE && productData ? productData.quantity || 0 : 0,
    brand: modalType === MODAL_TYPE.UPDATE && productData ? productData.brand || "" : "",
    origin: modalType === MODAL_TYPE.UPDATE && productData ? productData.origin || "" : "",
    expiry_date: modalType === MODAL_TYPE.UPDATE && productData ? productData.expiry_date || "" : "",
    storage_instructions: modalType === MODAL_TYPE.UPDATE && productData ? productData.storage_instructions || "" : "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    price: Yup.string().required("Vui lòng nhập giá sản phẩm"),
    discount: Yup.number().min(0, "Giảm giá không được nhỏ hơn 0").max(100, "Giảm giá không được lớn hơn 100%").required("Vui lòng nhập giảm giá"),
    unit: Yup.string().required("Vui lòng nhập đơn vị tính"),
    categoryId: Yup.number().min(0, "Vui lòng chọn danh mục").required("Vui lòng chọn danh mục"),
  });

  useEffect(() => {
    if (open) {
      getAllChildCategory();

      // If updating, fetch product details
      if (modalType === MODAL_TYPE.UPDATE && product) {
        getDetailProduct(product.id);
      } else {
        // Reset form for create mode
        setProductData(new ProductResponse());
        setExistingImages([]);
        setImage(null);
      }
    }
  }, [open, modalType, product]);

  useEffect(() => {
    if (resCategory) {
      if (isSuccess(resCategory)) {
        setListCategory(resCategory.data);
      } else {
        Toast.ToastError(resCategory.message);
      }
    }
  }, [resCategory]);

  useEffect(() => {
    if (resDetail && modalType === MODAL_TYPE.UPDATE) {
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
  }, [resDetail, modalType]);

  useEffect(() => {
    const response = modalType === MODAL_TYPE.CREATE ? resCreate : resUpdate;

    if (response) {
      if (isSuccess(response)) {
        const actionText = modalType === MODAL_TYPE.CREATE ? "Thêm" : "Cập nhật";
        Toast.ToastSuccess(`${actionText} sản phẩm thành công`);
        setRefresh(true);
        setImage(null);
        setExistingImages([]);
        setError("");
        setIsOpen(false);
      } else {
        Toast.ToastError(response.message);
      }
    }
  }, [resCreate, resUpdate, modalType]);

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
    // Validate images
    if (modalType === MODAL_TYPE.CREATE && (!image || image.length === 0)) {
      setError("Vui lòng chọn hình ảnh");
      return;
    }

    if (modalType === MODAL_TYPE.UPDATE && !existingImages.length && (!image || image.length === 0)) {
      setError("Vui lòng chọn hình ảnh");
      return;
    }

    let list_media_id = existingImages.map((media) => media.id);
    let default_media_id = existingImages.length > 0 ? existingImages[0].id : 0;

    // Upload new images if any
    if (image && image.length > 0) {
      const responseMedia = await upload(image, 1);
      if (responseMedia.status === HttpStatusCode.Ok) {
        const new_media_ids = responseMedia.data.map((md: MediaResponse) => md.id);
        list_media_id = [...list_media_id, ...new_media_ids];

        // Set default media id if not already set
        if (default_media_id === 0 && new_media_ids.length > 0) {
          default_media_id = new_media_ids[0];
        }
      } else {
        setError(responseMedia.message);
        return;
      }
    }

    const price_product = Number(values.price.replace(/,/g, ""));

    const productData = {
      name: values.name,
      description: values.description,
      category_id: values.categoryId,
      price: price_product,
      list_media_id: list_media_id,
      discount: values.discount,
      unit: values.unit,
      quantity: values.quantity,
      brand: values.brand,
      origin: values.origin,
      expiry_date: values.expiry_date,
      storage_instructions: values.storage_instructions,
    };

    if (modalType === MODAL_TYPE.CREATE) {
      createProduct({
        ...productData,
        default_media_id: default_media_id,
      });
    } else {
      updateProduct({
        id: values.id,
        ...productData,
      });
    }
  };

  // This function will be called when the Popup's submit button is clicked
  const handlePopupSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const popupTitle = modalType === MODAL_TYPE.CREATE ? "Thêm sản phẩm" : "Cập nhật sản phẩm";
  const submitText = modalType === MODAL_TYPE.CREATE ? "Thêm mới" : "Cập nhật";

  return (
    <Popup
      title={popupTitle}
      open={open}
      onClose={() => {
        setIsOpen(false);
      }}
      onSubmit={handlePopupSubmit}
      submitText={submitText}
      maxWidth="md"
    >
      <div className="card-body">
        {modalType === MODAL_TYPE.UPDATE && loading ? (
          <div className="text-center">
            <p>Đang tải thông tin sản phẩm...</p>
          </div>
        ) : (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} innerRef={formikRef} enableReinitialize={true}>
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
                          const value = e.target.value.replace(/,/g, "");
                          if (/^\d*$/.test(value)) {
                            setFieldValue("price", formatCurrencyDecimal(Number(value)));
                          }
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
                          const value = e.target.value.replace(/,/g, "");
                          if (/^\d*$/.test(value)) {
                            setFieldValue("quantity", Number(value));
                          }

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
                    {/* Existing images - only show in update mode */}
                    {modalType === MODAL_TYPE.UPDATE && existingImages && existingImages.length > 0 && (
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
                          <label>{modalType === MODAL_TYPE.UPDATE ? "Hình ảnh mới" : "Hình ảnh sản phẩm"}</label>
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

export default ProductActionPopup;
