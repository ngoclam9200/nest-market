// src/pages/ListProduct/ListProduct.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CategoryResponse } from "../../response/category";
import { isSuccess } from "../../services/base-response";
import { CategoryService } from "../../services/category/category-service";
import { ProductService } from "../../services/product/product-service";
import Deal from "../Home/Deal/Deal";
import "./list-product.scss";
import BannerSection from "../../components/share/banner-section/banner-section";
import CategorySidebar from "../../components/share/category-sidebar/category-sidebar";
import ProductFilter from "../../components/share/filter-product/filter-product";
import NewProductsSidebar from "../../components/share/new-product-sidebar/new-product-sidebar";
import CustomPagination from "../../components/share/pagination-section/pagination-section";
import ProductGrid from "../../components/share/product-grid/product-grid";
import ProductHeader from "../../components/share/product-header/product-header";
import PriceFilter from "../../components/share/price-filter/price-filter";

// Import extracted components

const ListProduct = () => {
  const [startValue, setStartValue] = useState<number>(0);
  const [endValue, setEndValue] = useState<number>(10000000);
  const [value, setValue] = useState<number[]>([startValue, endValue]);
  const { fetch: getListParentCategory, response: resListParentCategories } = CategoryService.getListParentCategory();
  const { fetch: getListChildCategory, response: resListChildCategories } = CategoryService.getAllChildCategory();
  const { fetch: getListProduct, response: resListProducts, loading: isLoadingProduct } = ProductService.getListProduct();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [sort_by, setSortBy] = useState<number>(-1);
  const [listProduct, setListProduct] = useState<any[]>([]);
  const [isFilterProduct, setIsFilterProduct] = useState(false);
  const [isCallApiProduct, setIsCallApiProduct] = useState(false);

  const [parentCategory, setParentCategory] = useState<CategoryResponse[]>([]);
  const [currentCategory, setCurrentCategory] = useState<CategoryResponse>(new CategoryResponse());

  const location = useLocation();
  const { categoryState } = location.state || {};

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setStartValue(newValue[0]);
      setEndValue(newValue[1]);
    }
    setValue(newValue as number[]);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleClickCategory = (id: number) => {
    let is_call_api = false;
    const tmp = parentCategory.map((item) => {
      if (item.id === id) {
        item.is_open = !item.is_open;
        item.is_call_api_child ? (is_call_api = false) : (is_call_api = true);
      }
      return item;
    });
    setParentCategory(tmp);
    if (is_call_api) {
      getListChildCategory({ parent_id: id, status: 1 });
    }
  };

  useEffect(() => {
    if (categoryState) {
      console.log("🚀 ~ useEffect ~ categoryState:", categoryState);
      setCurrentCategory(categoryState);

      setIsCallApiProduct(true);
    }
  }, [categoryState]);

  useEffect(() => {
    if (currentCategory.id && (isCallApiProduct || page > 1)) {
      // Build query parameters
      const queryParams = {
        category_id: currentCategory.id,
        page: page,
        limit: limit,
        sort_by: sort_by,
      };

      // Add price filter parameters if filtering by price
      if (isFilterProduct) {
        Object.assign(queryParams, {
          from_price: startValue,
          to_price: endValue,
        });
      }

      // Fetch products with the appropriate parameters
      getListProduct(queryParams);
    }
  }, [page, limit, isCallApiProduct, sort_by]);

  useEffect(() => {
    // Reset to page 1 when category or filter changes
    if (currentCategory.id || isFilterProduct) {
      if (page !== 1) {
        setPage(1);
      } else {
        setIsCallApiProduct(true);
      }
    }
  }, [currentCategory.id]); // Remove isFilterProduct from dependencies

  useEffect(() => {
    if (isFilterProduct) {
      setIsCallApiProduct(true);
    }
  }, [isFilterProduct]);

  useEffect(() => {
    if (resListChildCategories) {
      if (isSuccess(resListChildCategories)) {
        const tmp = parentCategory.map((item) => {
          if (item.id === resListChildCategories.data[0]?.parent_id) {
            item.children = resListChildCategories.data;
            item.is_call_api_child = true;
          }
          return item;
        });
        setParentCategory(tmp);
      }
    }
  }, [resListChildCategories]);

  useEffect(() => {
    if (resListProducts) {
      if (isSuccess(resListProducts)) {
        setListProduct(resListProducts.data.list);
        setTotal(resListProducts.data.total_record);
        setIsFilterProduct(false);
        setIsCallApiProduct(false);
      }
    }
  }, [resListProducts]);

  useEffect(() => {
    getListParentCategory({ status: 1 });
  }, []);

  useEffect(() => {
    if (resListParentCategories) {
      if (isSuccess(resListParentCategories)) {
        setParentCategory(resListParentCategories.data);
      }
    }
  }, [resListParentCategories]);

  return (
    <>
      <main className="main">
        <ProductHeader categoryName={currentCategory.name} />

        <div className="container-fluid mb-30">
          <div className="row flex-row-reverse">
            <div className="col-lg-4-5">
              <ProductFilter total={total} limit={limit} setLimit={setLimit} setSortBy={setSortBy} sort_by={sort_by} setIsCallApiProduct={setIsCallApiProduct} />
              <ProductGrid loading={isLoadingProduct} listProduct={listProduct} />
            </div>

            <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
              <div className="theiaStickySidebar">
                <CategorySidebar parentCategory={parentCategory} handleClickCategory={handleClickCategory} setCurrentCategory={setCurrentCategory} />

                <PriceFilter value={value} handleChange={handleChange} startValue={startValue} endValue={endValue} setIsFilterProduct={setIsFilterProduct} />

                <NewProductsSidebar />
                <BannerSection />
              </div>
            </div>
          </div>

          <CustomPagination count={Math.ceil(total / limit)} page={page} onChange={handleChangePage} />

          <Deal />
        </div>
      </main>
    </>
  );
};

export default ListProduct;
