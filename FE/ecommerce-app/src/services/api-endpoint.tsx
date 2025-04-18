 
export const API_PRODUCT_URL = {
  get GET_LIST_PRODUCT() {
    return `/product/all`;
  },

  DETAIL_PRODUCT(id: number) {
    return `/product/${id}`;
  },
};

export const API_MEDIA_URL = {
  get UPLOAD_MEDIA() {
    return "/media/upload";
  },
};

export const API_AUTH_URL = {
  get LOGIN() {
    return "/auth/signin";
  },
  get REGISTER() {
    return "/auth/resgister";
  },
};

export const API_CATEGORY_URL ={
  get GET_PARENT_CATEGORY() {
    return "/categories/parent";
  },
  get GET_CHILD_CATEGORY() {  
    return "/categories/child";
  },
   get GET_ALL_CHILD_CATEGORY() {
    return "/categories/all-child";
  },
  get GET_CATEGORY_WITH_CODE() {
    return "/categories/with-code/";
  },
};

 

export function getUrlWithEndPoint(id: string | number, endpoint: string): string {
  return `/${id}${endpoint}`;
}
