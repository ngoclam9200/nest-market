import { Timestamp } from 'typeorm';
import { UserResponse } from './user.response';
import { BannerEntity } from 'src/banner/entities/banner.entity';
import { MediaResponse } from './media.response';
import { title } from 'process';

export interface BannerResponse {
  id: number;
  name: string;
  description: string;
  media_id: number;
  created_at: Timestamp;
  updated_at: Timestamp;
  user_created?: UserResponse;
  user_updated?: UserResponse;
  title: string;
  status: number;
}

export function mapBannerResponse(banner: BannerEntity, media: MediaResponse , user_created?: UserResponse, user_updated?: UserResponse) {
  const response = {
    id: banner.id,
    name: banner.name,
    description: banner.description,
    media_id: banner.media_id,
    created_at: banner.created_at,
    updated_at: banner.updated_at,
    title: banner.title,
    user_created: user_created,
    user_updated: user_updated,
    media: {
      ...media,
      name: media.name || '',
    },
    status: banner.status,
  };
  return response;
}
