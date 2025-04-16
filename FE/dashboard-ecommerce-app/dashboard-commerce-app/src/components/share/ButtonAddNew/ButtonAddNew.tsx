import React from "react";

interface ButtonAddNewProps {
  title: string;
  createPopup?: () => void;
}

const ButtonAddNew: React.FC<ButtonAddNewProps> = ({
  title,
  createPopup,
}) => {
  return (
    <div className="row ">
      <div className="col-12 d-flex justify-content-end">
        <a
          onClick={createPopup}
          style={{ width: "200px" }}
          className="btn bg-gradient-info"
          type="button"
        >
          {title}
        </a>
      </div>
    </div>
  );
};

export default ButtonAddNew;
