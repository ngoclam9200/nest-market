import React from "react";
import "./NotifyCount.scss";

interface NotifyCountProps {
  icon: string;
  count: number;
  text: string;
}
const NotifyCount: React.FC<NotifyCountProps> = ({ icon, count, text }) => {
  return (
    <>
      {count > 0 && count < 10 && <span className="count">{count}</span>}
      {count >= 10 && <span className="count">9+</span>}
      <img src={icon}></img>
      <span>{text}</span>
    </>
  );
};
export default NotifyCount;
