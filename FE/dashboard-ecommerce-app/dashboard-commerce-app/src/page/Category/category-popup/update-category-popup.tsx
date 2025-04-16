import React, { useState } from "react";
import Popup from "../../../components/share/Popup/Popup";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";
import { updateCategory } from "../../../services/category/category-service";
import { ICategory } from "../../../interface/ICategory";
import { HttpStatusCode } from "../../../enums/Enum";
import { upload } from "../../../services/media/media-service";
import Toast from "../../../components/share/Toast/Toast";
import Image from "../../../components/share/Image/Image";
import { getCookie } from "../../../services/cookie";

interface UpdateCategoryProps {
  open: boolean;
  onClose: () => void;
  category: ICategory;
 
}

const CreateCategoryPopup: React.FC<UpdateCategoryProps> = ({ open, onClose, category }) => {
  const domainMedia = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_MEDIA_PORT + "/";
  const [name, setName] = useState(category.name);
  const [image, setImage] = useState<File | null>(null);

  const [description, setDescription] = useState(category.description);
  const [imageName, setImageName] = useState(category.media.name);
  const [imageUrl, setImageUrl] = useState<string>(domainMedia + category.media.url);
  const [error, setError] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState(false);
  // const dispatch = useAppDispatch();

  const clearData = () => {
    setName("");
    setDescription("");
    setError("");
    setIsSubmit(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files?.[0]);

      setImageUrl(URL.createObjectURL(e.target.files?.[0]));
      setImageName(e.target.files?.[0].name);
      setError("");
      setIsSubmit(false);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImageUrl("");
  };

  const handleSubmit = async () => {
    try {
      setIsSubmit(true);
      if (name.length == 0) {
        setError("Vui lòng điền đầy đủ thông tin");
        return;
      }
      if (!imageUrl) {
        setError("Vui lòng chọn hình ảnh");
        return;
      }
      let media_id = 0;
      if (image) {
        const responseMedia = await upload([image], 1);
        if (responseMedia.status != HttpStatusCode.Ok) {
          setError(responseMedia.message);
          return;
        }
        media_id = responseMedia.data[0].id;
      } else {
        media_id = category.media.id;
      }
      const branch_id = JSON.parse(getCookie("data_user")).branch_id;
      const response = await updateCategory(category.id, name, description, branch_id, media_id);
      if (response.status == HttpStatusCode.Ok) {
       
        Toast.ToastSuccess("Chỉnh sửa danh mục thành công");
        clearData();
        onClose();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
    }
  };

  return (
    <Popup title=" Chỉnh sửa danh mục" open={open} onClose={onClose} onSubmit={handleSubmit} submitText="Chỉnh sửa" cancelText="Huỷ">
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
        </form>

        <Box className="d-flex align-items-center ">
          {imageUrl && (
            <div>
              <ul className="list-img">
                <li className="item flex-column">
                  <div className="img">
                    <Image src={imageUrl}></Image>
                    <CloseIcon onClick={handleDeleteImage} className="btn-delete bg-gradient-secondary"></CloseIcon>
                  </div>

                  <div className="file-name">{imageName}</div>
                </li>
              </ul>
            </div>
          )}
          <Button variant="contained" component="label" className="btn bg-gradient-info ml-1" fullWidth sx={{ width: "120px" }}>
            {!imageUrl ? "Thêm ảnh" : "Thay đổi"}
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
