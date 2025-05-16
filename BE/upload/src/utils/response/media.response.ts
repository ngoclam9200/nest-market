import { MediaEntity } from 'src/media/entities/media.entity';
import { TypeMedia } from '../common/type-media-enum';
import { formatDateTime } from '../common/date-time-format';

export class MediaProductResponse {
  id: number = 0;
  url: string = '';
  size: number = 0;
  type: TypeMedia = TypeMedia.IMAGE;
  name: string = '';
  created_at: string = '';
  status: number = 1;
}

export function mapMediaResponse(media: MediaEntity): MediaProductResponse {
  return {
    id: media.id,
    name: media.name,
    url: media.url,
    size: media.size,
    type: media.type,
    created_at: formatDateTime(media.created_at),
    status: media.status,
  };
}
