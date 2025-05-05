import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TitleCard from "../../components/share/TitleCard/TitleCard";
import Loading from "../../components/share/Loading/Loading";
import Badge from "../../components/share/Badge/Badge";
import { Pagination, Stack } from "@mui/material";
import NotFound from "../../components/share/NotFound/NotFound";
import ButtonAddNew from "../../components/share/ButtonAddNew/ButtonAddNew";
import { isSuccess } from "../../services/base-response";
import EditButton from "../../components/share/ButtonActionTable/EditButtion";
import Image from "../../components/share/Image/Image";

 
import ChangeStatusProductPopup from "./product-popup/change-status-product-popup";
import { ProductResponse } from "../../response/product";
import ChangeStatusButton from "../../components/share/ButtonActionTable/ChangeStatusButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ProductService } from "../../services/product/product-service";
import Toast from "../../components/share/Toast/Toast";
import { domainMedia, MODAL_TYPE } from "../../enums/Enum";
import ProductActionPopup from "./product-popup/product-action-popup";
import { formatDate } from "../../utils/helpers";

const ProductList = () => {

 
  const [refresh, setRefresh] = useState(false);
  const [isOpenProductModal, setIsOpenProductModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.CREATE);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse>(new ProductResponse());
  const [isChangeStatusPopupOpen, setIsChangeStatusPopupOpen] = useState(false);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [totalRecord, setTotalRecord] = useState(0);

  const { fetch: getListProduct, response: resListProduct, loading: isLoading } = ProductService.getListProduct();

  // const navigate = useNavigate();
  const location = useLocation();

  const LIMIT = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    getListProduct({ page, limit: LIMIT , category_id:-1 });
  }, [page, location]);
  useEffect(() => {
    if (refresh) {
      getListProduct({ page, limit: LIMIT , category_id:-1 });
    }
  }, [refresh]);

  useEffect(() => {
    if (resListProduct) {
      if (isSuccess(resListProduct)) {
        setProducts(resListProduct.data.list);
        setTotalRecord(resListProduct.data.total_record);
        setRefresh(false);
      } else {
        Toast.ToastError(resListProduct.message);
      }
    }
  }, [resListProduct]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <div className="container-fluid">
        <ButtonAddNew createPopup={() => {
            setModalType(MODAL_TYPE.CREATE);
            setIsOpenProductModal(true);
        }} title="Thêm sản phẩm" />
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="d-flex">
                <TitleCard title={`Danh sách sản phẩm`}></TitleCard>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                {isLoading ? (
                  <div className="text-center align-items-center d-flex justify-content-center" style={{ height: "300px" }}>
                    <Loading></Loading>
                  </div>
                ) : products && products.length > 0 ? (
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tên</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Người tạo</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày tạo</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product: ProductResponse) => (
                          <tr key={product.id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>{product.media && <Image src={domainMedia + product.media_default.url} alt={product.name} className="avatar avatar-sm me-3" />}</div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{product.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">{product.user_created.username}</p>
                              <p className="text-xs text-secondary mb-0">{product.user_created.email}</p>
                            </td>

                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">{formatDate(product.created_at, "DD-MM-YYYY")}</span>
                            </td>

                            <td className="align-middle text-center text-sm">
                              <Badge status={product.status}></Badge>
                            </td>
                            <td className="align-middle">
                              <EditButton
                                functionProps={() => {
                                   setModalType(MODAL_TYPE.UPDATE);
                                   setSelectedProduct(product);
                                   setIsOpenProductModal(true);
                                }}
                              ></EditButton>

                              {product.status == 1 ? (
                                <ChangeStatusButton
                                  functionProps={() => {
                                    setIsChangeStatusPopupOpen(true);
                                    setSelectedProduct(product);
                                  }}
                                  icon={<CloseIcon style={{ color: "red" }} />}
                                />
                              ) : (
                                <ChangeStatusButton
                                  functionProps={() => {
                                    setSelectedProduct(product);
                                    setIsChangeStatusPopupOpen(true);
                                  }}
                                  icon={<CheckIcon style={{ color: "green" }} />}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Stack spacing={2} className="d-flex justify-content-end p-3">
                      <Pagination className="pagination-button" count={Math.ceil(totalRecord / LIMIT)} page={page} onChange={handleChangePage} />
                    </Stack>
                  </div>
                ) : (
                  <NotFound text={"Không tìm thấy sản phẩm"}></NotFound>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductActionPopup open={isOpenProductModal} setIsOpen={setIsOpenProductModal} setRefresh={setRefresh} modalType={modalType} product={selectedProduct} />
      {isChangeStatusPopupOpen && (
        <ChangeStatusProductPopup open={isChangeStatusPopupOpen} setIsOpenChangeStatus={setIsChangeStatusPopupOpen} product={selectedProduct} setRefresh={setRefresh} />
      )}
    </>
  );
};

export default ProductList;
