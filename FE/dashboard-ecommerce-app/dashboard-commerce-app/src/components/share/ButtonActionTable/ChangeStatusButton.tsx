import React, { ReactNode } from "react";

interface ChangeStatusButtonProps {
  functionProps?: () => void;
  icon: ReactNode;
}

const ChangeStatusButton: React.FC<ChangeStatusButtonProps> = ({
  functionProps,
  icon,
}) => {
  return (
    <a
      onClick={functionProps}
      style={{ cursor: "pointer", marginRight: "15px" }}
    >
      {icon}
    </a>
  );
};

export default ChangeStatusButton;
