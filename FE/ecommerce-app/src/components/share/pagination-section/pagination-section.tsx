// src/pages/ListProduct/components/CustomPagination.tsx
import Pagination from "@mui/material/Pagination";

interface CustomPaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ count, page, onChange }) => {
  return <Pagination count={count} page={page} onChange={onChange} />;
};

export default CustomPagination;
