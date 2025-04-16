import React, { useEffect, useState } from "react";
import Popup from "../../../components/share/Popup/Popup";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";
import { createCategory } from "../../../services/category/category-service";
import { ICategory } from "../../../interface/ICategory";
import { HttpStatusCode } from "../../../enums/Enum";
import { upload } from "../../../services/media/media-service";
import Toast from "../../../components/share/Toast/Toast";
 
import { getCookie } from "../../../services/cookie";

interface CreateCategoryProps {
  open: boolean;
  onClose: () => void;
  categories: ICategory[] | null;
  isCallApiListParent: boolean;
}

const CreateCategoryPopup: React.FC<CreateCategoryProps> = ({ open, onClose, categories }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [parentCategory, setParentCategory] = useState<number | null>(-1);
  const [error, setError] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState(false);
  // const dispatch = useAppDispatch();

  const clearData = () => {
    setName("");
    setDescription("");
    setParentCategory(null);
    setError("");
    setIsSubmit(false);
  };

  useEffect(() => {
    if (open) {
      // if (!isCallApiListParent) dispatch(fetchParentCategories());
    }
  }, [open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files?.[0]);
      setError("");
      setIsSubmit(false);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmit(true);
      if (name.length == 0) {
        setError("Vui lòng điền đầy đủ thông tin");
        return;
      }
      if (image) {
        const responseMedia = await upload([image], 1);
        const branch_id = JSON.parse(getCookie("data_user")).branch_id;
        if (responseMedia.status == HttpStatusCode.Ok) {
          const media_id = responseMedia.data[0].id;
          const response = await createCategory(name, description, parentCategory == -1 ? null : parentCategory, branch_id, media_id);
          if (response.status == HttpStatusCode.Ok) {
            // dispatch(addCategory(response.data));
            Toast.ToastSuccess("Thêm danh mục thành công");
            clearData();
            onClose();
          } else {
            setError(response.message);
          }
        } else {
          setError(responseMedia.message);
        }
      } else {
        setError("Vui lòng chọn hình ảnh");
        return;
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
    }
  };

  return (
    <Popup title=" Thêm danh mục" open={open} onClose={onClose} onSubmit={handleSubmit} submitText="Thêm" cancelText="Huỷ">
      <div className="card-body">
        <form role="form">
          <label>Tên danh mục</label>
          <div className="mb-3">
            <input
              type="text"
              className={isSubmit && name.length == 0 ? "is-invalid form-control" : "form-control"}
              placeholder="Tên danh mục"
              aria-label="Email"
              aria-describedby="email-addon"
              value={name}
              onChange={(e) => {
                setError("");
                setIsSubmit(false);
                setName(e.target.value);
              }}
            />
          </div>
          <label>Mô tả </label>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Mô tả"
              aria-label="Password"
              aria-describedby="password-addon"
              value={description}
              rows={3}
              onChange={(e) => {
                setError("");
                setIsSubmit(false);
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <label>Thuộc danh mục</label>
          <div className="mb-3">
            <select
              value={-1}
              onChange={(e) => {
                setError("");
                setIsSubmit(false);
                setParentCategory(Number(e.target.value));
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value={-1}>Không thuộc danh mục nào</option>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option disabled={true} key={-1} value={-1}>
                  Không tìm thấy danh mục
                </option>
              )}
            </select>
          </div>
        </form>

        <Box className="d-flex align-items-center ">
          {image && (
            <div>
              <ul className="list-img">
                <li className="item flex-column">
                  <div className="img">
                    <img src={URL.createObjectURL(image)}></img>
                    <CloseIcon onClick={handleDeleteImage} className="btn-delete bg-gradient-secondary"></CloseIcon>
                  </div>

                  <div className="file-name">{image.name}</div>
                </li>
              </ul>
            </div>
          )}
          <Button variant="contained" component="label" className="btn bg-gradient-info ml-1" fullWidth sx={{ marginTop: 2, width: "150px" }}>
            {!image ? "Thêm ảnh" : "Thay đổi"}
            <input type="file" multiple={true} accept="image/*" hidden onChange={handleImageChange} />
          </Button>
        </Box>

        <p className="text-danger" style={{ margin: "10px 0" }}>
          {error}
        </p>
      </div>
    </Popup>
  );
};

export default CreateCategoryPopup;
