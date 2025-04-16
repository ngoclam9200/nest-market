export class HttpResponse<T> {
  message: string = "";
  data: T = {} as T;
  status: number = 200;

  constructor(data?: Partial<HttpResponse<T>>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class DataArray<T> {
  list: T[] = [];
  total_record: number = 0;
  limit?: number = undefined;

  constructor(data?: Partial<DataArray<T>>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
