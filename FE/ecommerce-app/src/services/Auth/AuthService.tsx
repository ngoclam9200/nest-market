import { postData } from "../ApiService";
import { ApiUrlAuthEnum } from "../../enums/ApiEnum";
import { IHttpResponse } from "../../interface/IHttpResponse";
import { IUser } from "../../interface/IUser";

const domain =
  import.meta.env.VITE_API_DOMAIN +
  import.meta.env.VITE_API_AUTH_PORT +
  import.meta.env.VITE_API_PREFIX;
export const login = async (
  email: string,
  password: string
): Promise<IHttpResponse<IUser>> => {
  try {
    const response = await postData<{ email: string; password: string }>(
      domain + ApiUrlAuthEnum.LOGIN,
      { email, password }
    );
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
