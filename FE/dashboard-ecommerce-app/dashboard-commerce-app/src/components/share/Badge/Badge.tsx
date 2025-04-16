import React from "react";

interface BadgeProps {
  status: boolean | number;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  return (
    <span
      className={`badge badge-sm ${
        status ? "bg-gradient-success" : "bg-gradient-secondary"
      }`}
    >
      {status ? "Hoạt động" : "Tạm ngưng"}
    </span>
  );
};

export default Badge;
