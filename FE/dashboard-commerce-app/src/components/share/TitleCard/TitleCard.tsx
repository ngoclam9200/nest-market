import { max } from "moment";
import React from "react";

interface TitleCardProps {
  title: string;
  hightlight?: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ title, hightlight }) => {
  const gradientStyle: React.CSSProperties = {
    background: "linear-gradient(310deg, #2152ff 0%, #21d4fd 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    width: "max-content",
  };
  return (
    <div className="card-header pb-0 d-flex">
      <h6 style={{ width: "max-content" }}>{title}&nbsp;</h6>
      <h6 style={gradientStyle}>{hightlight}</h6>
    </div>
  );
};

export default TitleCard;
