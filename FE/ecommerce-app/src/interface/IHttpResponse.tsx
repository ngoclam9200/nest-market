export interface IHttpResponse<T> {
  message: string;
  data: T;
  status: number;
}
