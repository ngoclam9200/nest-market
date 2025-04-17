export const API_AUTH_URL = {
  get LOGIN() {
    return "/auth/signin";
  },
  get REGISTER() {
    return "/auth/resgister";
  },
};

export const API_CATEGORY_URL = {
  get GET_PARENT_CATEGORY() {
    return "/categories/parent";
  },
  get GET_CHILD_CATEGORY() {
    return "/categories/child";
  },
  get GET_ALL_CHILD_CATEGORY() {
    return "/categories/all-child";
  },
  get CREATE_CATEGORY() {
    return "/categories/create";
  },
  get UPDATE_CATEGORY() {
    return "/categories/update";
  },
  get GET_CATEGORY_WITH_CODE() {
    return "/categories/with-code/";
  },
  CHANGE_STATUS_CATEGORY() {
    return "/categories/change-status";
  },
};

export const API_BANNER_URL = {
  get GET_ALL_BANNER() {
    return "/banner";
  },
  get CREATE_BANNER() {
    return "/banner/create";
  },
  get UPDATE_BANNER() {
    return "/banner/update";
  },

  CHANGE_STATUS_BANNER() {
    return "/banner/change-status";
  },
};

export const API_PRODUCT_URL = {
  get GET_LIST_PRODUCT() {
    return `/product/all`;
  },
  get CREATE_PRODUCT() {
    return `/product/create`;
  },
  UPDATE_PRODUCT() {
    return `/product/update`;
  },
  DETAIL_PRODUCT(id: number) {
    return `/product/${id}`;
  },
  CHANGE_STATUS_PRODUCT() {
    return `/product/change-status`;
  },
};

export const API_MEDIA_URL = {
  get UPLOAD_MEDIA() {
    return "/media/upload";
  },
};

export function getUrlWithEndPoint(id: string | number, endpoint: string): string {
  return `/${id}${endpoint}`;
}
