import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from 'axios'
import { CustomError, ParameterError } from "./error";

@Injectable()
export class KakaoWork {
	private appKey: string;
	private apiUri: string;
	private roomID: string;
	private appName: string;

	constructor(private readonly configService: ConfigService) {
		this.appKey = this.configService.get('KAKAO_WORK_APP_KEY');
		this.apiUri = this.configService.get('KAKAO_WORK_API_URI');
		this.roomID = this.configService.get('KAKAO_WORK_ROOM_ID');
		this.appName = this.configService.get('APP_NAME') || 'ZEMIVERSE';
	}

	async sendMessage(exception: Error, userId: string, method: string, url: string): Promise<void> {
		const conversationsUrl = this.apiUri + '/messages.send';
		const headers = {
			'Authorization': `Bearer ${this.appKey}`,
			'Content-Type': 'application/json'
		}
		const data = this.makeErrorData(exception, userId, method, url);

		const result: any = await axios.post(conversationsUrl, data, {headers: headers}).catch((err) => {
			console.log(err);
		});
		// if(!result.data.success) {
		// 	console.log(result);
		// }
	}

	makeErrorData(exception: Error, userId: string, method: string, url: string) {
		const splitStack = exception.stack.split('\n');
		const sectionInlines = [];
		if(exception instanceof ParameterError) {
			for(const validate of exception.params) {
				sectionInlines.push({type:"styled", text: JSON.stringify(validate.constraints)+'\n'});
			}
		}
		else {
			for(let i=1; i<5; i++) {
				sectionInlines.push({type: "styled", text: splitStack[i]});
			}
		}
		return {
			conversation_id: this.roomID,
			text: `${exception.name}`,
			blocks: [
				{type: "header", text: exception.name, style: "red"},
				{type: "description", term: "App", content: {type: "text", text: this.appName}, accent: true},
				{type: "divider"},
				{type: "description", term: "UserID", content: {type: "text", text: userId}, accent: true},
				{type: "divider"},
				{type: "description", term: "Method", content: {type: "text", text: method}, accent: true},
				{type: "divider"},
				{type: "description", term: "URL", content: {type: "text", text: url}, accent: true},
				{type: "divider"},
				{type: "section", content: {type: "text", text: ".", inlines: sectionInlines}}
			]
		}
	}

	async makeRoom(userIds: number[], roomName: string) {
		const conversationsUrl = this.apiUri + '/v1/conversations.open';
		const headers = {
			'Authrization': `Bearer ${this.appKey}`,
			'Content-Type': 'application/json'
		}
		const data = {
			user_ids: userIds,
			conversation_name: roomName
		}
		const result: any = await axios.post(conversationsUrl, data, {headers: headers});
		return result.data.conversation.id;
	}
}