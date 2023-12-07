import { HttpException, HttpStatus, ValidationError } from "@nestjs/common";

export class CustomError extends HttpException {
	code: string
	logging: boolean
	constructor() {
		super('Bad Request', HttpStatus.BAD_REQUEST);
		this.code = '';
		this.logging = true;
	}
}

class CustomErrorWithoutLogging extends CustomError {
	constructor() {
		super();
		this.logging = false;
	}
}

export class TestErrorWithoutLogging extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'TEST_WITHOUT_LOGGING'
	}
}

export class TestError extends CustomError {
	constructor() {
		super();
		this.code = 'TEST'
	}
}

export class ParameterError extends CustomError {
	params: ValidationError[]

	constructor(validationErrors: ValidationError[]) {
		super();
		this.code = 'WRONG_PARAMETER';
		this.params = [];
		for(const error of validationErrors) {
			this.params.push({property: error.property, value: error.value, constraints: error.constraints});
		}
	}
}

export class AuthTokenExpiredError extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'TOKEN_EXPIRATION';
	}
}

export class OauthInvalidRequest extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'OAUTH_INVALID_REQUEST';
	}
}

export class CategoryNotMatch extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'CATEGORY_NOT_MATCH';
	}
}

export class EntityNotMatch extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'ENTITY_NOT_MATCH';
	}
}

export class DateComparisonNotMatch extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'DATE_COMPARISON_NOT_MATCH';
	}
}

export class SortNotMatch extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'SORT_NOT_MATCH';
	}
}

export class NoPermission extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'NO_PERMISSION';
	}
}

export class RedisError extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'SERVER_REDIS_ERROR';
	}
}

export class MysqlConnectError extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'MYSQL_CONNECT_ERROR';
	}
}

export class PlatformNotMatch extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'PLATFORM_NOT_MATCH';
	}
}

export class AlreadyExist extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'ALREADY_EXIST'
	}
}

export class NotFoundData extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'NOT_FOUND_DATA'
	}
}

export class AccountIdAlreadyExist extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'ACCOUNT_ID_ALREADY_EXIST'
	}
}

export class NicknameAlreadyExist extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'NICKNAME_ALREADY_EXIST'
	}
}

export class NotExist extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'NOT_EXIST'
	}
}

export class InvalidPassword extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'INVALID_PASSWORD'
	}
}

export class InvalidDate extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'INVALID_DATE'
	}
}

export class PermissionNotFound extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'PERMISSION_NOT_FOUND'
	}
}

export class InvalidNickname extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'INVALID_NICKNAME'
	}
}

export class ExposeAtLeastOne extends CustomErrorWithoutLogging {
	constructor() {
		super();
		this.code = 'EXPSE_AT_LEAST_ONE';
	}
}