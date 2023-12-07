import { applyDecorators, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import * as url from 'url';
import { Transform } from "class-transformer"
import { IsBoolean as OriginalIsBoolean } from "class-validator";

export const UserId = createParamDecorator<string>(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.userId;
	},
);

export const AdminId = createParamDecorator<string>(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.adminId;
	},
);

@ValidatorConstraint({ name: 'notUrl', async: false })
export class NotUrlValidator implements ValidatorConstraintInterface {

	validate(text: string, args: ValidationArguments) {
		// Parse the input text as a URL
		const RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		return RegExp.test(text);
		// const parsedUrl = url.parse(text);
		//
		// // Check if the URL protocol is either "http" or "https"
		// return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';

		 // Input does NOT contain a URL
	}

	defaultMessage(args: ValidationArguments) {
		return 'Text must not contain a URL';
	}
}

export function IsBooleanFromZemiverse() {
	return applyDecorators(ToBoolean(), OriginalIsBoolean());
}

function ToBoolean() {
	const toPlain = Transform(
		({ value }) => {
			return value;
		},
		{
			toPlainOnly: true,
		}
	);
	const toClass = (target: any, key: string) => {
		return Transform(
			({ obj }) => {
				return valueToBoolean(obj[key]);
			},
			{
				toClassOnly: true,
			}
		)(target, key);
	};
	return function (target: any, key: string) {
		toPlain(target, key);
		toClass(target, key);
	};
}

function valueToBoolean(value: any) {
	if (value === null || value === undefined) {
		return undefined;
	}
	if (typeof value === "boolean") {
		return value;
	}
	if (["true", "on", "yes", "1"].includes(value.toLowerCase())) {
		return true;
	}
	if (["false", "off", "no", "0"].includes(value.toLowerCase())) {
		return false;
	}
	return value;
}