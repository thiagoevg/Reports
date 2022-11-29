import { CallHandler, Catch, ExecutionContext } from '@nestjs/common'
import { LoggerHttpInterceptor } from '@tagmedev/tagme-nest-common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Catch()
export class GlobalInterceptor extends LoggerHttpInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return super.intercept(context, next)
	}
}
