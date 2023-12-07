import { Controller, Post, Get, Body, Query, Put, UseGuards } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto, GetEventListDto, UpdateEventDto } from "./dto";
import { UserId } from "@project_z_web_backend/common";
import { AuthGuard, PermissionGuard } from "../middleware";

@UseGuards(AuthGuard,PermissionGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@UserId() userId: string, @Body() inputData: CreateEventDto){
    inputData.userId = userId;
    return await this.eventService.createEvent(inputData);
  }

  @Get()
  async getEventList(@Query() inputData: GetEventListDto){
    return await this.eventService.getEventList(inputData);
  }

  @Get('detail')
  async getEventDetail(@Query() inputData: any){
    return await this.eventService.getEventDetail(inputData.eventId);
  }

  @Put()
  async updateNotice(@Body() inputData: UpdateEventDto){
    await this.eventService.updateEvent(inputData);
  }
}
