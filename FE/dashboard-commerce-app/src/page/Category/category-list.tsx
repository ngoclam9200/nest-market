import { useEffect, useState } from "react";
import CreateCategoryPopup from "./category-popup/create-category-popup";
import { CategoryResponse } from "../../response/category";
import NotFound from "../../components/share/NotFound/NotFound";
import ButtonAddNew from "../../components/share/ButtonAddNew/ButtonAddNew";
import TitleCard from "../../components/share/TitleCard/TitleCard";
import Badge from "../../components/share/Badge/Badge";
import { formatDate } from "../../utils/FormatDateTime";
import Loading from "../../components/share/Loading/Loading";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import EditButton from "../../components/share/ButtonActionTable/EditButtion";
import NavigationButton from "../../components/share/ButtonActionTable/Navigation";
import Image from "../../components/share/Image/Image";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Pagination, Stack } from "@mui/material";
import UpdateCategoryPopup from "./category-popup/update-category-popup";
import ChangeStatusCategoryPopup from "./category-popup/change-status-category-popup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChangeStatusButton from "../../components/share/ButtonActionTable/ChangeStatusButton";

import { getCookie } from "../../services/cookie";
import { CategoryService } from "../../services/category/category-service";
import { isSuccess } from "../../services/base-response";

const CategoryList = () => {
  const domainMedia = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_MEDIA_PORT + "/";
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isChangeStatusPopupOpen, setIsChangeStatusPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentParentCategory, setCurrentParentCategory] = useState<CategoryResponse | null>(null);
  const [listParentCategories, setListParentCategories] = useState<CategoryResponse[]>([]);
  const [listChildCategories, setListChildCategories] = useState<CategoryResponse[]>([]);
  const [totalRecordListChildCategories, setTotalRecordListChildCategories] = useState(0);
  const [showListCategory, setShowListCategory] = useState<CategoryResponse[]>([]);

  const [dataObjectCategory, setDataObjectCategory] = useState<CategoryResponse>(new CategoryResponse());

  const navigate = useNavigate();
  const location = useLocation();
  const { parentNameCategory } = useParams<{ parentNameCategory: string }>();

  const LIMIT = 10;
  const [pageListChild, setPageListChild] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const { fetch: getListParentCategory, response: resListParentCategoriesResponse } = CategoryService.getListParentCategory();
  const { fetch: getListChildCategory, response: resListChildCategory } = CategoryService.getListChildCategory();
  const { fetch: getCategoryWithCode, response: resCategoryWithCode } = CategoryService.getCategoryWithCode();
  useEffect(() => {
    if (resListParentCategoriesResponse)
      if (isSuccess(resListParentCategoriesResponse)) {
        setListParentCategories(resListParentCategoriesResponse.data);
        setIsLoading(false);
        return;
      }
  }, [resListParentCategoriesResponse]);
  useEffect(() => {
    if (resListChildCategory)
      if (isSuccess(resListChildCategory)) {
        setListChildCategories(resListChildCategory.data.list);
        setTotalRecordListChildCategories(resListChildCategory.data.total_record);
        setRefresh(false);
        setIsLoading(false);
        return;
      }
  }, [resListChildCategory]);

  useEffect(() => {
    if (resCategoryWithCode)
      if (isSuccess(resCategoryWithCode)) {
        setCurrentParentCategory(resCategoryWithCode.data);
        setIsLoading(false);
        return;
      }
  }, [resCategoryWithCode]);

  useEffect(() => {
    if (parentNameCategory) {
      if (!currentParentCategory || (parentNameCategory !== currentParentCategory.code && currentParentCategory !== null)) {
        getCategoryWithCode(parentNameCategory);
      }
      return;
    }

    setCurrentParentCategory(null);
    
    getListParentCategory({ status: -1});
    setRefresh(false);
  }, [location, parentNameCategory]);

  useEffect(() => {
    if (listChildCategories && parentNameCategory) {
      setShowListCategory(listChildCategories);
      return;
    }

    if (listParentCategories && listParentCategories.length > 0) {
      setShowListCategory(listParentCategories);
      return;
    }
  }, [listParentCategories, listChildCategories]);

  useEffect(() => {
    if (currentParentCategory) {
      getListChildCategory({
        page: pageListChild,
        limit: LIMIT,
      });
    }
  }, [currentParentCategory, pageListChild]);

  useEffect(() => {
    if (refresh) {
      if (currentParentCategory) {
        getListChildCategory({
          page: pageListChild,
          limit: LIMIT,
        });
      } else {
        setCurrentParentCategory(null);

        
        getListParentCategory({ status: -1 });
      }
      setRefresh(false);
    }
  }, [refresh]);

  const backCategoryParent = () => {
    navigate(`/category`);
  };

  const handleClickGoCategoryChild = (category: CategoryResponse) => {
    setCurrentParentCategory(category);
    navigate(`/category/${category.code}`);
  };

  const handleChangePageListChild = (_: React.ChangeEvent<unknown>, value: number) => {
    setPageListChild(value);
  };

  return (
    <>
      <div className="container-fluid">
        <ButtonAddNew createPopup={() => setIsCreatePopupOpen(true)} title="Thêm danh mục" />
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="d-flex">
                {currentParentCategory && (
                  <div className="card-header pb-0 " style={{ paddingRight: 0 }}>
                    <ArrowBackIcon onClick={() => backCategoryParent()} style={{ cursor: "pointer" }}></ArrowBackIcon>
                  </div>
                )}
                <TitleCard title={`Danh mục`} hightlight={currentParentCategory ? currentParentCategory?.name : ""}></TitleCard>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                {isLoading ? (
                  <div className="text-center align-items-center d-flex justify-content-center" style={{ height: "300px" }}>
                    <Loading></Loading>
                  </div>
                ) : showListCategory && showListCategory.length > 0 ? (
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder ">Tên</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Người tạo</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Ngày tạo</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Trạng thái</th>
                          <th className="text-secondary "></th>
                        </tr>
                      </thead>
                      <tbody>
                        {showListCategory.map((category: CategoryResponse) => (
                          <tr key={category.id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <Image src={domainMedia + category.media.url} className="avatar avatar-sm me-3" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{category.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">{category.user_created.username}</p>
                              <p className="text-xs text-secondary mb-0">{category.user_created.email}</p>
                            </td>

                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">{formatDate(category.created_at, "DD-MM-YYYY")}</span>
                            </td>

                            <td className="align-middle text-center text-sm">
                              <Badge status={category.status}></Badge>
                            </td>
                            <td className="align-middle ">
                              <EditButton
                                functionProps={() => {
                                  setDataObjectCategory(category);
                                  setIsUpdatePopupOpen(true);
                                }}
                              ></EditButton>
                              {!currentParentCategory && <NavigationButton functionProps={() => handleClickGoCategoryChild(category)}></NavigationButton>}
                              {category.status == 1 ? (
                                <ChangeStatusButton
                                  functionProps={() => {
                                    setDataObjectCategory(category);
                                    setIsChangeStatusPopupOpen(true);
                                  }}
                                  icon={<CloseIcon style={{ color: "red" }} />}
                                />
                              ) : (
                                <ChangeStatusButton
                                  functionProps={() => {
                                    setDataObjectCategory(category);
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

                    {currentParentCategory && totalRecordListChildCategories > 0 && (
                      <Stack spacing={2} className="d-flex justify-content-end">
                        <Pagination
                          className="pagination-button"
                          count={Math.ceil(totalRecordListChildCategories / LIMIT)}
                          page={pageListChild}
                          onChange={handleChangePageListChild}
                        />
                      </Stack>
                    )}
                  </div>
                ) : (
                  <NotFound text={"Không tìm thấy danh mục"}></NotFound>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreatePopupOpen && <CreateCategoryPopup setRefresh={setRefresh} open={isCreatePopupOpen} setIsOpenCreate={setIsCreatePopupOpen} />}

      {isUpdatePopupOpen && <UpdateCategoryPopup category={dataObjectCategory} open={isUpdatePopupOpen} setIsOpenUpdate={setIsUpdatePopupOpen} setRefresh={setRefresh} />}

      {isChangeStatusPopupOpen && (
        <ChangeStatusCategoryPopup category={dataObjectCategory} open={isChangeStatusPopupOpen} setIsOpen={setIsChangeStatusPopupOpen} setRefresh={setRefresh} />
      )}
    </>
  );
};

export default CategoryList;
