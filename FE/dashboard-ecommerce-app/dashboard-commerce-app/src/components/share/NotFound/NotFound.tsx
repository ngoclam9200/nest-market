import React from "react";

interface NotFoundProps {
  text: string;
}

const NotFound: React.FC<NotFoundProps> = ({ text }) => {
  return (
    <div className="d-flex align-items-center flex-column pt-6">
      <img style={{width: "60%" , maxWidth:"500px"}} src="./src/assets/img/page-404.png" />
      <p className="text-center w-100">{text}</p>
    </div>
  );
};

export default NotFound; 
