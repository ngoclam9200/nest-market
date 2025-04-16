import ModeEditIcon from "@mui/icons-material/ModeEdit";
import React from "react";

interface EditButtonProps {
  functionProps?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ functionProps }) => {
  return (
    <a
      onClick={functionProps}
      style={{ cursor: "pointer", marginRight: "15px" }}
    >
      <ModeEditIcon />
    </a>
  );
};

export default EditButton;
