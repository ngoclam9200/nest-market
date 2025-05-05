import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { HttpStatusCode } from "axios";
import Popup from "../../../components/share/Popup/Popup";
import Toast from "../../../components/share/Toast/Toast";
import { BannerResponse } from "../../../response/banner";
import { MediaResponse } from "../../../response/media";
import { upload } from "../../../services/media/media-service";
import { BannerService } from "../../../services/banner/banner-service";
import { isSuccess } from "../../../services/base-response";
import { domainMedia, MODAL_TYPE } from "../../../enums/Enum";

// Define modal types
 

interface BannerActionProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
  modalType: MODAL_TYPE;
  banner?: BannerResponse | null;
}

interface BannerFormValues {
  name: string;
  description: string;
  title: string;
  media_id: number;
}

const BannerActionPopup: React.FC<BannerActionProps> = ({ open, setRefresh, setIsOpen, modalType, banner }) => {
  const [error, setError] = useState<string>("");
  const formikRef = useRef<any>(null);
  const [uploadedMedia, setUploadedMedia] = useState<MediaResponse[]>([]);
  const { fetch: createBanner, response: resCreate } = BannerService.createBanner();
  const { fetch: updateBanner, response: resUpdate } = BannerService.updateBanner();

  // Initialize form values based on modal type and banner data
  const getInitialValues = (): BannerFormValues => {
    if (modalType === MODAL_TYPE.UPDATE && banner) {
      return {
        name: banner.name || "",
        description: banner.description || "",
        title: banner.title || "",
        media_id: banner.media?.id || 0,
      };
    }
    return {
      name: "",
      description: "",
      title: "",
      media_id: 0,
    };
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên banner"),
    media_id: Yup.number().min(1, "Vui lòng chọn hình ảnh").required("Vui lòng chọn hình ảnh"),
    title: Yup.string().required("Vui lòng nhập tiêu đề"),
  });

  useEffect(() => {
    // Reset uploaded media when modal opens
    if (open) {
      setUploadedMedia([]);
      setError("");
    }
  }, [open]);

  useEffect(() => {
    const response = modalType === MODAL_TYPE.CREATE ? resCreate : resUpdate;

    if (response) {
      if ((modalType === MODAL_TYPE.CREATE && response.status === HttpStatusCode.Ok) || (modalType === MODAL_TYPE.UPDATE && isSuccess(response))) {
        const actionText = modalType === MODAL_TYPE.CREATE ? "Tạo" : "Cập nhật";
        Toast.ToastSuccess(`${actionText} banner thành công`);
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

  const handleSubmit = async (values: BannerFormValues, {}: FormikHelpers<BannerFormValues>) => {
    if (modalType === MODAL_TYPE.UPDATE && !banner) {
      setError("Không tìm thấy thông tin banner");
      return;
    }

    const bannerData = {
      name: values.name,
      description: values.description,
      title: values.title,
      media_id: values.media_id,
    };

    if (modalType === MODAL_TYPE.CREATE) {
      createBanner(bannerData);
    } else if (banner) {
      updateBanner({
        id: banner.id,
        ...bannerData,
      });
    }
  };

  // This function will be called when the Popup's submit button is clicked
  const handlePopupSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const popupTitle = modalType === MODAL_TYPE.CREATE ? "Tạo banner mới" : "Cập nhật banner";
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
        <Formik initialValues={getInitialValues()} validationSchema={validationSchema} onSubmit={handleSubmit} innerRef={formikRef} enableReinitialize={true}>
          {({ handleChange }) => (
            <Form>
              <label>Tên banner</label>
              <div className="mb-3">
                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Tên banner"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setError("");
                    handleChange(e);
                  }}
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <label>Tiêu đề</label>
              <div className="mb-3">
                <Field
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Tiêu đề"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setError("");
                    handleChange(e);
                  }}
                />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>

              <label>Hình ảnh</label>
              <div className="mb-3">
                <input type="file" className="form-control" accept="image/*" onChange={handleUploadMedia} />
                <Field type="hidden" name="media_id" />
                <ErrorMessage name="media_id" component="div" className="text-danger" />

                {/* Show uploaded image if available */}
                {uploadedMedia.length > 0 && (
                  <div className="mt-2">
                    <img src={domainMedia + uploadedMedia[0].url} alt="Banner preview" style={{ width: "100%", maxHeight: "200px" }} />
                  </div>
                )}

                {/* Show existing image in update mode if no new image uploaded */}
                {modalType === MODAL_TYPE.UPDATE && uploadedMedia.length === 0 && banner?.media && (
                  <div className="mt-2">
                    <img src={domainMedia + banner.media.url} alt="Banner preview" style={{ width: "100%", maxHeight: "200px" }} />
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

export default BannerActionPopup;
