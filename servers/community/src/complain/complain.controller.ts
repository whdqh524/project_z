import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ComplainService } from "./complain.service";
import { AuthGuard, UserId } from "@project_z_web_backend/common";
import { CreateComplainInputDto } from "./dto/create.complain.dto";

@UseGuards(AuthGuard)
@Controller('complain')
export class ComplainController {
	constructor(private readonly complainService: ComplainService) {}

	@Post()
	async createComplain(@UserId() userId: string, @Body() body: CreateComplainInputDto): Promise<void> {
		body.userId = userId;
		return await this.complainService.createComplain(body)
	}

}
