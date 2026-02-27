import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';

@Injectable()
export class CustomInterceptor implements NestInterceptor{
    intercept(context:ExecutionContext,next:CallHandler<any>){
        console.log('Before handling the request...');
        const result=next.handle();
        console.log('After handling the request...');
        return result;
    }
}