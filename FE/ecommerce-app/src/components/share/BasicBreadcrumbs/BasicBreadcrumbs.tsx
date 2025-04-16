import "./BasicBreadcrumbs.scss";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
interface BreadcrumbItem {
  name: string;
  href?: string;
  icon?: React.ElementType;
}

interface BasicBreadcrumbsProps {
  breadcrumb: BreadcrumbItem[];
}

const BasicBreadcrumbs: React.FC<BasicBreadcrumbsProps> = ({ breadcrumb }) => {
  return (
    <div className="breadcrumbs-container" role="presentation" onClick={handleClick}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumb.map((item, index) => {
          const Icon = item.icon;

          return item.href ? (
            <Link
              key={index}
              underline="none"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href={item.href}
            >
              {Icon && <Icon sx={{ mr: 0.5 , mb:0 }} fontSize="inherit" />}
              {item.name}
            </Link>
          ) : (
            <Typography
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              {Icon && <Icon sx={{ mr: 0.5 }} fontSize="inherit" />}
              {item.name}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BasicBreadcrumbs;
