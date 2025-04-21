// src/pages/ListProduct/components/ProductFilter.tsx
import GridViewIcon from "@mui/icons-material/GridView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";

interface ProductFilterProps {
  total: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ total }) => {
  return (
    <div className="shop-product-fillter">
      <div className="totall-product">
        <p>
          Tìm thấy <strong className="text-brand">{total}</strong> sản phẩm!
        </p>
      </div>
      <div className="sort-by-product-area">
        <div className="sort-by-cover mr-10">
          <div className="sort-by-product-wrap">
            <div className="sort-by">
              <span>
                <GridViewIcon />
                Show:
              </span>
            </div>
            <div className="sort-by-dropdown-wrap">
              <span>
                50 <KeyboardArrowDownIcon />
              </span>
            </div>
          </div>
          <div className="sort-by-dropdown">
            <ul>
              <li>
                <a className="active">
                  <CheckIcon />
                  50
                </a>
              </li>
              <li>
                <a>100</a>
              </li>
              <li>
                <a>150</a>
              </li>
              <li>
                <a>200</a>
              </li>
              <li>
                <a>All</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="sort-by-cover">
          <div className="sort-by-product-wrap">
            <div className="sort-by">
              <span>
                <GridViewIcon />
                Sort by:
              </span>
            </div>
            <div className="sort-by-dropdown-wrap">
              <span>
                Featured
                <KeyboardArrowDownIcon />
              </span>
            </div>
          </div>
          <div className="sort-by-dropdown">
            <ul>
              <li>
                <a className="active">
                  <CheckIcon />
                  Featured
                </a>
              </li>
              <li>
                <a>Price: Low to High</a>
              </li>
              <li>
                <a>Price: High to Low</a>
              </li>
              <li>
                <a>Release Date</a>
              </li>
              <li>
                <a>Avg. Rating</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
