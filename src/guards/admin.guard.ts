import {CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";


export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if(!request.currentUser){
            return false;
        }
        if(request.currentUser.admin === false){
            throw new UnauthorizedException('User is not admin');
        }
        return request.currentUser.admin;
    }
}