import React from "react";

interface ImageProps {
  alt?: string;
  src: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ alt, src, className }) => {
  return (
    <img style={{ width: "100%" , height:"100%" }}
      alt={alt}
      src={src}
      className={className}
      onError={(e) => (e.currentTarget.src = "./src/assets/img/default.png")}
    />
  );
};

export default Image;
