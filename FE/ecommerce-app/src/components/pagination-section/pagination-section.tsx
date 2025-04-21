import React from "react";
import Pagination from "@mui/material/Pagination";

interface PaginationSectionProps {
  total: number;
  limit: number;
  page: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationSection: React.FC<PaginationSectionProps> = ({ total, limit, page, handleChangePage }) => {
  return <Pagination count={Math.ceil(total / limit)} page={page} onChange={handleChangePage} />;
};

export default PaginationSection;
