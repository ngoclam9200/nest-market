export const ApiConfig = {
  API_URL: import.meta.env.VITE_API_DOMAIN,
  DOMAIN_LOGIN: import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_AUTH_PORT,
  PROJECT_ID: {
    AUTH_SERVICE: import.meta.env.VITE_API_AUTH_PORT,
    PRODUCT_SERVICE: import.meta.env.VITE_API_PRODUCT_PORT,
    USER_SERVICE: import.meta.env.VITE_API_USER_PORT,
    MEDIA_SERVICE: import.meta.env.VITE_API_MEDIA_PORT,
  },
};
