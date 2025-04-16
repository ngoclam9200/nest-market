export enum ApiUrlAuthEnum {
  LOGIN = "/auth/signin",
  REGISTER = "/auth/resgister",
}

export enum ApiUrlCategoryEnum {
  GET_PARENT_CATEGORY = "/categories/parent",
  GET_CHILD_CATEGORY = "/categories/child",
  GET_ALL_CHILD_CATEGORY = "/categories/all-child",
  CREATE_CATEGORY = "/categories/create",
  UPDATE_CATEGORY = "/categories/update",
  GET_CATEGORY_WITH_CODE = "/categories/with-code/",
}

 

export const ApiUrlProduct = {
  
  get GET_LIST_PRODUCT() {
    return `/product/all`;
  },
  CREATE_PRODUCT() {
    return `/product/create`;
  },
   UPDATE_PRODUCT() {
    return `/product/update`;
  },
  DETAIL_PRODUCT() {
    return `/product/detail`;
  },
};

export enum ApiUrlMediaEnum {
  UPLOAD_MEDIA = "/media/upload",
}

export function getUrlWithEndPoint(
  id: string | number,
  endpoint: string
): string {
  return `/${id}${endpoint}`;
}
