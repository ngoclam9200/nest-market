import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BasicBreadcrumbs from "../../../components/share/BasicBreadcrumbs/BasicBreadcrumbs";

interface ProductHeaderProps {
  categoryName: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ categoryName }) => {
  const breadcrumb = [{ name: "Trang chủ", href: "/", icon: HomeOutlinedIcon }, { name: "Danh mục" }, { name: categoryName }];

  return (
    <div className="page-header mt-30 mb-50">
      <div className="container-fluid">
        <div className="archive-header">
          <div className="row align-items-center">
            <div className="col-xl-12">
              <h1 className="mb-15 text-center">{categoryName}</h1>
            </div>
            <div className="col-xl-12 d-none d-xl-block">
              <BasicBreadcrumbs breadcrumb={breadcrumb} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
