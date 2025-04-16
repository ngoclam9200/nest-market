import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TitleCard from "../../components/share/TitleCard/TitleCard";
import Loading from "../../components/share/Loading/Loading";
import { IProduct } from "../../interface/IProduct";
import { formatDate } from "../../utils/FormatDateTime";
import Badge from "../../components/share/Badge/Badge";
import { Pagination, Stack } from "@mui/material";
import NotFound from "../../components/share/NotFound/NotFound";
import ButtonAddNew from "../../components/share/ButtonAddNew/ButtonAddNew";
 
import { isSuccess } from "../../services/base-response";
import EditButton from "../../components/share/ButtonActionTable/EditButtion";
import ChangeStatusButton from "../../components/share/ButtonActionTable/ChangeStatusButton";
import Image from "../../components/share/Image/Image";
import { getListProduct } from "../../services/product/product-service";
import CreateProductPopup from "./product-popup/create-product-popup";
import UpdateProductPopup from "./product-popup/update-product-popup";
// import UpdateProductPopup from "./product-popup/update-product-popup";
 

const ProductList = () => {
  const domainMedia = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_MEDIA_PORT + "/";

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  // const [isChangeStatusPopupOpen, setIsChangeStatusPopupOpen] = useState(false);
  const [dataObjectProduct, setDataObjectProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate();
  const location = useLocation();

  const LIMIT = 10;
  const [page, setPage] = useState(1);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getListProduct({page, limit:LIMIT});

      if (isSuccess(response)) {
        setProducts(response.data.list);
        setTotalRecord(response.data.total_record);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, location , refresh]);

  // const handleOpenPopupCreate = () => {
  //   setIsCreatePopupOpen(true);
  // };

  // const handleClosePopupCreate = () => {
  //   setIsCreatePopupOpen(false);
  //   loadProducts(); // Reload products after creation
  // };

  // const handleOpenPopupUpdate = (product: IProduct) => {
  //   setProductUpdate(product);
  //   setIsUpdatePopupOpen(true);
  // };

  // const handleClosePopupUpdate = () => {
  //   setIsUpdatePopupOpen(false);
  //   setProductUpdate(null);
  //   loadProducts(); // Reload products after update
  // };

  // const handleOpenPopupChangeStatus = (product: IProduct) => {
  //   setProductUpdate(product);
  //   setIsChangeStatusPopupOpen(true);
  // };

  // const handleClosePopupChangeStatus = () => {
  //   setIsChangeStatusPopupOpen(false);
  //   setProductUpdate(null);
  //   loadProducts(); // Reload products after status change
  // };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <div className="container-fluid">
        <ButtonAddNew createPopup={() => setIsCreatePopupOpen(true)} title="Thêm sản phẩm" />
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
                        {products.map((product: IProduct) => (
                          <tr key={product.id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>{product.media && <Image src={domainMedia + product.media.url} alt={product.name} className="avatar avatar-sm me-3" />}</div>
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
            
                              <EditButton functionProps={() => {
                                setDataObjectProduct(product);
                                setIsUpdatePopupOpen(true)}}></EditButton>
                              {/* <ChangeStatusButton onClick={() => handleOpenPopupChangeStatus(product)} status={product.status} /> */}
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

      {isCreatePopupOpen && <CreateProductPopup setRefresh={setRefresh} open={isCreatePopupOpen} setIsOpenCreate={setIsCreatePopupOpen} />}

      {isUpdatePopupOpen && <UpdateProductPopup setIsOpenUpdate={setIsUpdatePopupOpen}  product={dataObjectProduct} open={isUpdatePopupOpen} setRefresh={setRefresh}  />}

      {/* {isChangeStatusPopupOpen && productUpdate && <ChangeStatusProductPopup product={productUpdate} open={isChangeStatusPopupOpen} onClose={handleClosePopupChangeStatus} />} */}
    </>
  );
};

export default ProductList;
