import { useEffect, useState } from "react";
import { BannerResponse } from "../../response/banner";
import NotFound from "../../components/share/NotFound/NotFound";
import ButtonAddNew from "../../components/share/ButtonAddNew/ButtonAddNew";
import Badge from "../../components/share/Badge/Badge";
import Loading from "../../components/share/Loading/Loading";
import EditButton from "../../components/share/ButtonActionTable/EditButtion";
import Image from "../../components/share/Image/Image";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ChangeStatusBannerPopup from "./banner-popup/change-status-banner-popup";
import ChangeStatusButton from "../../components/share/ButtonActionTable/ChangeStatusButton";
import { BannerService } from "../../services/banner/banner-service";
import { isSuccess } from "../../services/base-response";
import { domainMedia, MODAL_TYPE } from "../../enums/Enum";
import { formatDate } from "../../utils/helpers";
import BannerActionPopup from "./banner-popup/banner-action-popup";

const BannerList = () => {
  const [isOpenBannerModal, setIsOpenBannerModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.CREATE);
  const [selectedBanner, setSelectedBanner] = useState<BannerResponse>(new BannerResponse());
  const [isChangeStatusPopupOpen, setIsChangeStatusPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listBanner, setListBanner] = useState<BannerResponse[]>([]);
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
        <ButtonAddNew
          createPopup={() => {
            setModalType(MODAL_TYPE.CREATE);
            setIsOpenBannerModal(true);
          }}
          title="Thêm banner"
        />
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
                                  setModalType(MODAL_TYPE.UPDATE);
                                  setSelectedBanner(banner);
                                  setIsOpenBannerModal(true);
                                }}
                              ></EditButton>

                              {banner.status == 1 ? (
                                <ChangeStatusButton
                                  functionProps={() => {
                                    setSelectedBanner(banner);
                                    setIsChangeStatusPopupOpen(true);
                                  }}
                                  icon={<CloseIcon style={{ color: "red" }} />}
                                />
                              ) : (
                                <ChangeStatusButton
                                  functionProps={() => {
                                    setSelectedBanner(banner);
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

      <BannerActionPopup open={isOpenBannerModal} setIsOpen={setIsOpenBannerModal} setRefresh={setRefresh} modalType={modalType} banner={selectedBanner} />

      {isChangeStatusPopupOpen && <ChangeStatusBannerPopup banner={selectedBanner} open={isChangeStatusPopupOpen} setIsOpen={setIsChangeStatusPopupOpen} setRefresh={setRefresh} />}
    </>
  );
};

export default BannerList;
