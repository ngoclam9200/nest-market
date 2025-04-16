import { SetMetadata } from "@nestjs/common";

export const AuthorizeRoles= (...roles:string[])=> SetMetadata('allowedRoles', roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const PublicAPI = () => SetMetadata(IS_PUBLIC_KEY, true);
