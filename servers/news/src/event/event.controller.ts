import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventService } from "./event.service";
import { GetEventDetailInputDto, GetEventsInputDto } from "./dto/get.event.dto";

@Controller('event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get('list/:category')
	async getEvents(@Param() param: any, @Query() query: GetEventsInputDto): Promise<object> {
		return await this.eventService.getEvents(param.category, query);
	}

	@Get('detail')
	async getEventDetail(@Query() query: GetEventDetailInputDto): Promise<object> {
		return await this.eventService.getEventDetail(query.postId);
	}
}
