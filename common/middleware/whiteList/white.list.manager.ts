import { Injectable } from '@nestjs/common';

@Injectable()
export class WhiteListManager {
	private endPoints: string[];
	constructor() {
		this.endPoints = [];
	}

	addEndPoint(endPointList: string[]) {
		for(const endPoint of endPointList) {
			if(!this.endPoints.includes(endPoint)) {
				this.endPoints.push(endPoint);
			}
		}
	}

	checkEndPoint(endPoint: string): boolean {
		return this.endPoints.includes(endPoint);
	}
}