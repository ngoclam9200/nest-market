import { UserEntity } from "src/user/entities/user.entity";
import { Roles } from "../common/user-roles.enum";
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateUserService {
    checkRoleAndCurrentUser(user: UserEntity, id: number): boolean {
        if (user.roles.includes(Roles.ADMIN)) return true;
        if (user.id == id) return true;
        return false;
    }
}