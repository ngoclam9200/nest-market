// src/pages/ListProduct/components/ProductFilter.tsx
import React, { useState, useEffect } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";

interface ProductFilterProps {
  total: number;
  limit: number;
  setLimit: (limit: number) => void;
  sort_by: number;
  setSortBy: (sort_by: number) => void;
  setIsCallApiProduct : (isCallApiProduct: boolean) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ total, limit, setLimit, sort_by, setSortBy, setIsCallApiProduct }) => {
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedItemsCount, setSelectedItemsCount] = useState(limit || 10);
  const [selectedSort, setSelectedSort] = useState("Không lọc");

  // Update local state when props change
  useEffect(() => {
    setSelectedItemsCount(limit);
    setIsCallApiProduct(true);
  }, [limit]);

  useEffect(() => {
    // Update the selected sort text based on the sort_by value
    switch (sort_by) {
      case 0:
        setSelectedSort("Không lọc");
        break;
      case 1:
        setSelectedSort("Giá từ thấp đến cao");
        break;
      case 2:
        setSelectedSort("Giá từ cao đến thấp");
        break;
      default:
        setSelectedSort("Không lọc");
    }
    setIsCallApiProduct(true);

  }, [sort_by]);

  const toggleItemsDropdown = () => {
    setShowItemsDropdown(!showItemsDropdown);
    setShowSortDropdown(false); // Close the other dropdown
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
    setShowItemsDropdown(false); // Close the other dropdown
  };

  const handleSelectItemsCount = (count: number) => {
    setSelectedItemsCount(count);
    setLimit(count); // Call the setLimit function from props
    setShowItemsDropdown(false);
  };

  const handleSelectSort = (sort: string, sortValue: number) => {
    setSelectedSort(sort);
    setSortBy(sortValue); // Call the setSortBy function from props
    setShowSortDropdown(false);
  };

  return (
    <div className="shop-product-fillter">
      <div className="totall-product">
        <p>
          Tìm thấy <strong className="text-brand">{total}</strong> sản phẩm!
        </p>
      </div>
      <div className="sort-by-product-area">
        <div className="sort-by-cover mr-10">
          <div className="sort-by-product-wrap" onClick={toggleItemsDropdown}>
            <div className="sort-by">
              <span>
                <GridViewIcon />
                Hiển thị:
              </span>
            </div>
            <div className="sort-by-dropdown-wrap">
              <span>
                {selectedItemsCount} <KeyboardArrowDownIcon />
              </span>
            </div>
          </div>
          <div className="sort-by-dropdown" style={{ opacity: showItemsDropdown ? 1 : 0, visibility: showItemsDropdown ? "visible" : "hidden" }}>
            <ul>
              <li>
                <a className={selectedItemsCount === 10 ? "active" : ""} onClick={() => handleSelectItemsCount(10)}>
                  {selectedItemsCount === 10 && <CheckIcon />}
                  10
                </a>
              </li>
              <li>
                <a className={selectedItemsCount === 50 ? "active" : ""} onClick={() => handleSelectItemsCount(50)}>
                  {selectedItemsCount === 50 && <CheckIcon />}
                  50
                </a>
              </li>
              <li>
                <a className={selectedItemsCount === 100 ? "active" : ""} onClick={() => handleSelectItemsCount(100)}>
                  {selectedItemsCount === 100 && <CheckIcon />}
                  100
                </a>
              </li>
              <li>
                <a className={selectedItemsCount === 150 ? "active" : ""} onClick={() => handleSelectItemsCount(150)}>
                  {selectedItemsCount === 150 && <CheckIcon />}
                  150
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="sort-by-cover">
          <div className="sort-by-product-wrap" onClick={toggleSortDropdown}>
            <div className="sort-by">
              <span>
                <GridViewIcon />
                Lọc theo:
              </span>
            </div>
            <div className="sort-by-dropdown-wrap">
              <span>
                {selectedSort}
                <KeyboardArrowDownIcon />
              </span>
            </div>
          </div>
          <div className="sort-by-dropdown" style={{ opacity: showSortDropdown ? 1 : 0, visibility: showSortDropdown ? "visible" : "hidden" }}>
            <ul>
              <li>
                <a className={sort_by === 0 ? "active" : ""} onClick={() => handleSelectSort("Không lọc", 0)}>
                  {sort_by === 0 && <CheckIcon />}
                  Không lọc
                </a>
              </li>
              <li>
                <a className={sort_by === 1 ? "active" : ""} onClick={() => handleSelectSort("Giá từ thấp đến cao", 1)}>
                  {sort_by === 1 && <CheckIcon />}
                  Giá từ thấp đến cao
                </a>
              </li>
              <li>
                <a className={sort_by === 2 ? "active" : ""} onClick={() => handleSelectSort("Giá từ cao đến thấp", 2)}>
                  {sort_by === 2 && <CheckIcon />}
                  Giá từ cao đến thấp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
