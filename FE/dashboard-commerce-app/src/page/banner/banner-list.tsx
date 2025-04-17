import { useEffect, useState } from "react";
import CreateBannerPopup from "./banner-popup/create-banner-popup";
import { BannerResponse } from "../../response/banner";
import NotFound from "../../components/share/NotFound/NotFound";
import ButtonAddNew from "../../components/share/ButtonAddNew/ButtonAddNew";
import Badge from "../../components/share/Badge/Badge";
import { formatDate } from "../../utils/FormatDateTime";
import Loading from "../../components/share/Loading/Loading";
import EditButton from "../../components/share/ButtonActionTable/EditButtion";
import Image from "../../components/share/Image/Image";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import UpdateBannerPopup from "./banner-popup/update-banner-popup";
import ChangeStatusBannerPopup from "./banner-popup/change-status-banner-popup";
import ChangeStatusButton from "../../components/share/ButtonActionTable/ChangeStatusButton";
import { BannerService } from "../../services/banner/banner-service";
import { isSuccess } from "../../services/base-response";

const BannerList = () => {
  const domainMedia = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_MEDIA_PORT + "/";
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isChangeStatusPopupOpen, setIsChangeStatusPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listBanner, setListBanner] = useState<BannerResponse[]>([]);
  const [dataObjectBanner, setDataObjectBanner] = useState<BannerResponse>(new BannerResponse());
  const [refresh, setRefresh] = useState(false);

  const { fetch: getListBanner, response: resListBannerResponse } = BannerService.getAllBanner();

  useEffect(() => {
    getListBanner();
  }, []);
  useEffect(() => {
    if (resListBannerResponse)
      if (isSuccess(resListBannerResponse)) {
        setListBanner(resListBannerResponse.data);
        setIsLoading(false);
        return;
      }
  }, [resListBannerResponse]);

  useEffect(() => {
    if (refresh) {
      getListBanner();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <>
      <div className="container-fluid">
        <ButtonAddNew createPopup={() => setIsCreatePopupOpen(true)} title="Thêm banner" />
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-body px-0 pt-0 pb-2">
                {isLoading ? (
                  <div className="text-center align-items-center d-flex justify-content-center" style={{ height: "300px" }}>
                    <Loading></Loading>
                  </div>
                ) : listBanner && listBanner.length > 0 ? (
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder ">Tên</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Người tạo</th>
                          <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder ">Tiêu đề</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Ngày tạo</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Trạng thái</th>
                          <th className="text-secondary "></th>
                        </tr>
                      </thead>
                      <tbody>
                        {listBanner.map((banner: BannerResponse) => (
                          <tr key={banner.id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="w-[10%] h-[100px] me-3">
                                  <Image src={domainMedia + banner.media.url} className="   " />
                                </div>
                                <div className="d-flex flex-column justify-content-center ">
                                  <h6 className="mb-0 text-sm">{banner.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">{banner.user_created.username}</p>
                              <p className="text-xs text-secondary mb-0">{banner.user_created.email}</p>
                            </td>
                            <td>
                              <p className="text-xs   mb-0">{banner.title}</p>
                            </td>

                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">{formatDate(banner.created_at, "DD-MM-YYYY")}</span>
                            </td>

                            <td className="align-middle text-center text-sm">
                              <Badge status={banner.status}></Badge>
                            </td>
                            <td className="align-middle ">
                              <EditButton
                                functionProps={() => {
                                  setDataObjectBanner(banner);
                                  setIsUpdatePopupOpen(true);
                                }}
                              ></EditButton>

                              {banner.status == 1 ? (
                                <ChangeStatusButton
                                  functionProps={() => {
                                    setDataObjectBanner(banner);
                                    setIsChangeStatusPopupOpen(true);
                                  }}
                                  icon={<CloseIcon style={{ color: "red" }} />}
                                />
                              ) : (
                                <ChangeStatusButton
                                  functionProps={() => {
                                    setDataObjectBanner(banner);
                                    setIsChangeStatusPopupOpen(true);
                                  }}
                                  icon={<CheckIcon style={{ color: "green" }} />}
                                />
                              )}
                            </td>
                            <td className="align-middle text-center text-sm"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <NotFound text={"Không tìm thấy banner"}></NotFound>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreatePopupOpen && <CreateBannerPopup setRefresh={setRefresh} open={isCreatePopupOpen} setIsOpenCreate={setIsCreatePopupOpen} />}

      {isUpdatePopupOpen && <UpdateBannerPopup banner={dataObjectBanner} open={isUpdatePopupOpen} setIsOpenUpdate={setIsUpdatePopupOpen} setRefresh={setRefresh} />}

      {isChangeStatusPopupOpen && (
        <ChangeStatusBannerPopup banner={dataObjectBanner} open={isChangeStatusPopupOpen} setIsOpen={setIsChangeStatusPopupOpen} setRefresh={setRefresh} />
      )}
    </>
  );
};

export default BannerList;
