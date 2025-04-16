import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React from "react";

interface NavigationButtonProps {
  functionProps?: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  functionProps,
}) => {
  return (
    <a
      onClick={functionProps}
      style={{ cursor: "pointer", marginRight: "15px" }}
    >
      <ArrowCircleRightIcon />
    </a>
  );
};

export default NavigationButton;
