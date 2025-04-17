import axios from "axios";
import { HttpResponse } from "../../response/http-response";
 
import { getBearerToken } from "../cookie";
import { API_MEDIA_URL } from "../api-endpoint";
const domain = import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_API_MEDIA_PORT + import.meta.env.VITE_API_PREFIX;

export const upload = async (files: File[], type: number): Promise<HttpResponse<any>> => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file)); // Use 'file' as the field name
    formData.append("type", type.toString()); // Append type as a string
    const response = await axios.post<HttpResponse<any>>(domain + API_MEDIA_URL.UPLOAD_MEDIA, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getBearerToken()}`, // Include token if required
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
