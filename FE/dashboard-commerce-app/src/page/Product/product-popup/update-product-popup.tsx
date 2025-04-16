import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { HttpStatusCode } from "axios";
import Popup from "../../../components/share/Popup/Popup";
import Toast from "../../../components/share/Toast/Toast";
import { updateProduct } from "../../../services/product/product-service";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { IProduct } from "../../../interface/IProduct";
import { getAllChildCategory } from "../../../services/category/category-service";
import { getCookie } from "../../../services/cookie";
import { ICategory } from "../../../interface/ICategory";

interface UpdateProductProps {
  open: boolean;
  setIsOpenUpdate: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
  product: IProduct | null;
}

interface ProductFormValues {
  name: string;
  description: string;
  media_id: number;
}

const UpdateProductPopup: React.FC<UpdateProductProps> = ({ open, setRefresh, setIsOpenUpdate, product }) => {
  const [error, setError] = useState<string>("");
  const formikRef = useRef<any>(null);
  const [listCategory, setListCategory] = useState<ICategory[]>([]);

  // Initialize form values from product data
  const getInitialValues = (): ProductFormValues => {
    if (!product) {
      return {
        name: "",
        description: "",
        media_id: -1,
      };
    }

    return {
      name: product.name || "",
      description: product.description || "",
      media_id: product.media_id || -1,
    };
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    media_id: Yup.number().min(0, "Vui lòng chọn hình ảnh").required("Vui lòng chọn hình ảnh"),
  });

    useEffect(() => {
      if (open) {
        // Fetch categories
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

  const handleSubmit = async (values: ProductFormValues, { setSubmitting }: FormikHelpers<ProductFormValues>) => {
    try {
      if (!product) {
        setError("Không tìm thấy thông tin sản phẩm");
        return;
      }

      const response = await updateProduct(product.id, values.name, values.description, values.media_id);

      if (response.status === HttpStatusCode.Ok) {
        Toast.ToastSuccess("Cập nhật sản phẩm thành công");
        setRefresh(true);
        setIsOpenUpdate(false);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Cập nhật sản phẩm thất bại. Vui lòng thử lại.");
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
      title="Cập nhật sản phẩm"
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

              <label>Hình ảnh</label>
              <div className="mb-3">
                {product && product.media ? (
                  <div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <li   className="item flex-column">
                          <div className="img">
                            {/* <img src={URL.createObjectURL(img)} alt={`Product image ${index}`} /> */}
                            {/* <CloseIcon onClick={() => handleDeleteImage(index)} className="btn-delete bg-gradient-secondary" /> */}
                          </div>
                          {/* <div className="file-name">{img.name}</div> */}
                        </li>
                      </div>
                    </div>

                    <Field type="hidden" name="media_id" value={product.media_id} />
                  </div>
                ) : (
                  <div className="alert alert-warning">Sản phẩm không có hình ảnh. Vui lòng thêm hình ảnh trước khi cập nhật.</div>
                )}
                <ErrorMessage name="media_id" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label>Thông tin khác</label>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-control-label">Giá</label>
                      <p className="form-control-static">{formatCurrency(product?.price || 0)}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-control-label">Tồn kho</label>
                      <p className="form-control-static">{product?.stock || 0}</p>
                    </div>
                  </div>
                </div>
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

export default UpdateProductPopup;
