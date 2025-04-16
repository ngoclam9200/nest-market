export class MediaResponse {
  created_at: string = "";
  id: number = 0;
  status: boolean = true;
  size: number = 0;
  type: number = 0;
  url: string = "";
  name: string = "";

  constructor(data?: Partial<MediaResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
