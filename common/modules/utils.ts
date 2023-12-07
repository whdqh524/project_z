import * as CryptoJS from 'crypto-js'
import {ParameterError} from "./error";

export function encryptAESPassword(password: string, salt: string): string {
	return CryptoJS.AES.encrypt(password, salt).toString();
}

export function decryptAESPassword(encryptedPassword: string, salt: string): string {
	return CryptoJS.AES.decrypt(encryptedPassword, salt).toString(CryptoJS.enc.Utf8);
}

export function decryptAccessToken(access_token: string, datetime: number) {
	const secret = new Date(datetime).getTime().toString()
	return CryptoJS.AES.decrypt(access_token, secret).toString(CryptoJS.enc.Utf8);
}

export function randomString() {
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	const string_length = 30;
	let randomstring = '';
	for (let i = 0; i < string_length; i++) {
		const rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum + 1);
	}
	return randomstring;
}


export function generateSalt() {
	return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

export function encryptPassword(password: string, salt: string) {
	return CryptoJS.HmacSHA256(password, salt).toString();
}


export function validNickname(nickname: string) {
	return /^[가-힣A-Za-z0-9-]{1,10}$/.test(nickname)
}