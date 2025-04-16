import { useEffect, useState } from "react";
import CreateCategoryPopup from "./category-popup/create-category-popup";
import { ICategory } from "../../interface/ICategory";
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
import { getCategoryWithCode, getListChildCategory, getListParentCategory } from "../../services/category/category-service";
import { getCookie } from "../../services/cookie";

const CategoryList = () => {
  const domainMedia = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_MEDIA_PORT + "/";
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isChangeStatusPopupOpen, setIsChangeStatusPopupOpen] = useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState<ICategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentParentCategory, setCurrentParentCategory] = useState<ICategory | null>(null);
  const [listParentCategories, setListParentCategories] = useState<ICategory[]>([]);
  const [listChildCategories, setListChildCategories] = useState<ICategory[]>([]);
  const [totalRecordListChildCategories, setTotalRecordListChildCategories] = useState(0);
  const [showListCategory, setShowListCategory] = useState<ICategory[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { parentNameCategory } = useParams<{ parentNameCategory: string }>();

  const LIMIT = 2;
  const [pageListChild, setPageListChild] = useState(1);
  const [isCallApiListParent, setIsCallApiListParent] = useState(false);

  // Fetch parent categories
  const fetchParentCategories = async () => {
    setIsLoading(true);
    try {
      const branch_id = JSON.parse(getCookie("data_user")).branch_id;
      const response = await getListParentCategory({ status: -1, branch_id: branch_id });
      if (response.data) {
        setListParentCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch current category by code
  const fetchCurrentCategory = async (code: string) => {
    setIsLoading(true);
    try {
      const response = await getCategoryWithCode(code);
      if (response.data) {
        setCurrentParentCategory(response.data);
      }
    } catch (error) {
      console.error("Error fetching current category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch child categories
  const fetchChildCategories = async (parentId: number, page: number, limit: number) => {
    setIsLoading(true);
    try {
      const response = await getListChildCategory({
        branch_id: JSON.parse(getCookie("data_user")).branch_id,
        parent_id: parentId,
        page,
        limit,
      });

      if (response.data) {
        setListChildCategories(response.data.list);
        setTotalRecordListChildCategories(response.data.total_record);
      }
    } catch (error) {
      console.error("Error fetching child categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (parentNameCategory) {
      if (!currentParentCategory || (parentNameCategory !== currentParentCategory.code && currentParentCategory !== null)) {
        fetchCurrentCategory(parentNameCategory);
      }
      return;
    }

    setIsCallApiListParent(true);
    setCurrentParentCategory(null);
    fetchParentCategories();
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
      fetchChildCategories(currentParentCategory.id, pageListChild, LIMIT);
    }
  }, [currentParentCategory, pageListChild]);

  const handleOpenPopupCreate = () => {
    setIsCreatePopupOpen(true);
  };

  const handleOpenPopupChangeStatus = (category: ICategory) => {
    setCategoryUpdate(category);
    setIsChangeStatusPopupOpen(true);
  };

  const handleOpenPopupUpdate = (category: ICategory) => {
    setCategoryUpdate(category);
    setIsUpdatePopupOpen(true);
  };

  const handleClosePopupCreate = () => {
    setIsCreatePopupOpen(false);
    setPageListChild(1);
    // Refresh data after creating
    if (currentParentCategory) {
      fetchChildCategories(currentParentCategory.id, pageListChild, LIMIT);
    } else {
      fetchParentCategories();
    }
  };

  const backCategoryParent = () => {
    navigate(`/category`);
  };

  const handleClosePopupUpdate = () => {
    setIsUpdatePopupOpen(false);
    // Refresh data after updating
    if (currentParentCategory) {
      fetchChildCategories(currentParentCategory.id, pageListChild, LIMIT);
    } else {
      fetchParentCategories();
    }
  };

  const handleClosePopupChangeStatus = () => {
    setIsChangeStatusPopupOpen(false);
    // Refresh data after status change
    if (currentParentCategory) {
      fetchChildCategories(currentParentCategory.id, pageListChild, LIMIT);
    } else {
      fetchParentCategories();
    }
  };

  const handleClickGoCategoryChild = (category: ICategory) => {
    setCurrentParentCategory(category);
    navigate(`/category/${category.code}`);
  };

const handleChangePageListChild = (_: React.ChangeEvent<unknown>, value: number) => {
  setPageListChild(value);
};

  return (
    <>
      <div className="container-fluid">
        <ButtonAddNew createPopup={handleOpenPopupCreate} title="Thêm danh mục" />
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
                        {showListCategory.map((category: ICategory) => (
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
                              <EditButton functionProps={() => handleOpenPopupUpdate(category)}></EditButton>
                              {!currentParentCategory && <NavigationButton functionProps={() => handleClickGoCategoryChild(category)}></NavigationButton>}
                              {category.status == 1 ? (
                                <ChangeStatusButton functionProps={() => handleOpenPopupChangeStatus(category)} icon={<CloseIcon style={{ color: "red" }} />} />
                              ) : (
                                <ChangeStatusButton functionProps={() => handleOpenPopupChangeStatus(category)} icon={<CheckIcon style={{ color: "green" }} />} />
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

      {isCreatePopupOpen && (
        <CreateCategoryPopup isCallApiListParent={isCallApiListParent} categories={listParentCategories} open={isCreatePopupOpen} onClose={handleClosePopupCreate} />
      )}

      {isUpdatePopupOpen && categoryUpdate && (
        <UpdateCategoryPopup category={categoryUpdate} open={isUpdatePopupOpen} onClose={handleClosePopupUpdate}  />
      )}

      {isChangeStatusPopupOpen && categoryUpdate && (
        <ChangeStatusCategoryPopup category={categoryUpdate} open={isChangeStatusPopupOpen} onClose={handleClosePopupChangeStatus} currentPage={pageListChild} />
      )}
    </>
  );
};

export default CategoryList;
