import { Observable } from "rxjs";
import { ApiResponse } from "./response.interface";
import { MediaResponse } from "../response/media.response";

export interface MediaServiceGrpcClient {
  getMedia( getMediaRequest : GetMediaRequest) : Observable<ApiResponse<MediaResponse>>;
  getMediasByIds( getUserByIdsRequest : GetMediaByIdsRequest) : Observable<ApiResponse<MediaResponse[]>>;
}
 
export interface GetMediaRequest {
  media_id:number;
}

export interface GetMediaByIdsRequest {
  media_ids:number[];
}


