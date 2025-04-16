import { CanActivate, ExecutionContext, UnauthorizedException, mixin } from "@nestjs/common";


export const AuthorizeGuard=(allowedRoles: string[])=>{
    class RolesGuardMisxin implements CanActivate{
        canActivate (context : ExecutionContext){
            const request = context.switchToHttp().getRequest();
            const result = request.currentUser.roles.map((role: string)=> allowedRoles.includes(role)).find((val:boolean)=>val==true) 
             if(result) return true;
            throw new UnauthorizedException('Bạn không có quyền truy cập')
        }    
    }
    const  guard = mixin(RolesGuardMisxin)
    return guard

} 

 

