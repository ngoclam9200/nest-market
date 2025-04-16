export interface IHttpResponse<T> {
  message: string;
  data: T;
  status: number;
}


export interface IDataArray<T> {
  list: T[];
  total_record: number;
  limit?: number;
}
