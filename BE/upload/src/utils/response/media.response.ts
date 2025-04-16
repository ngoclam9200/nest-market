import { TypeMedia } from '../common/type-media-enum';

export interface MediaProductResponse {
  id: number;
  product_id: number;
  url: string;
  size: number;
  type: TypeMedia;
  created_at: string;
  status: boolean;
}
