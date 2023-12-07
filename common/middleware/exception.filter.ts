import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	ValidationError,
	Injectable
} from '@nestjs/common';
import { KakaoWork, CustomError, ParameterError } from "../modules";

export interface ResponseError {
	success: boolean;
	code?: string;
	message?: string;
	validate?: ValidationError[];
}

@Injectable()
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	constructor(private readonly kakaoWork: KakaoWork) {
	}

	async catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest();
		const response = ctx.getResponse();

		let status = exception && exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const result = <ResponseError>{success : false}
		result.code = 'UnknownError';
		const userId = request.userId || 'None User';
		if(exception instanceof CustomError) {
			result.code = exception.code;
			if(exception instanceof ParameterError) {
				result.validate = exception.params;
			}
			if(exception.logging) {
				await this.kakaoWork.sendMessage(exception, userId, request.method, request.url);
			}
		} else {
			await this.kakaoWork.sendMessage(exception, userId, request.method, request.url);
			result.message = exception.message;
		}

		response.status(status).json(result);
	}
}