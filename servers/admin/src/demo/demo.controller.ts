import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DemoService } from "./demo.service";
import { AuthGuard, PermissionGuard } from "../middleware";
import { UpdatePasswordInputDto } from "./dto/update.password.dto";
import {
	DeleteLinkInputDto,
	GetLinkListInputDto,
	GetUploadUrlInputDto,
	UpdateVideoLinkInputDto,
	UploadCompleteInputDto,
} from "./dto/link.dto";

@UseGuards(AuthGuard, PermissionGuard)
@Controller('demo')
export class DemoController {
	constructor(private readonly demoService: DemoService) {}

	@Get('password')
	async getCurrentPassword(): Promise<string> {
		return await this.demoService.getCurrentPassword()
	}

	@Patch('password')
	async updatePassword(@Body() body: UpdatePasswordInputDto): Promise<void> {
		return await this.demoService.updatePassword(body.password);
	}

	@Get('link/list/:category')
	async getLinkList(@Param() params: any, @Query() query: GetLinkListInputDto): Promise<object> {
		return await this.demoService.getLinkList(params.category, query);
	}

	@Get('upload/url/:category')
	async getUploadUrl(@Param() params: any, @Query() query: GetUploadUrlInputDto): Promise<string> {
		return await this.demoService.getUploadUrl(params.category, query.fileName);
	}

	@Post('upload/complete/IR')
	async uploadCompleteIR(@Body() body: UploadCompleteInputDto): Promise<void> {
		return await this.demoService.uploadComplete('IR', body);
	}

	@Post('upload/complete/APK')
	async uploadCompleteApk(@Body() body: UploadCompleteInputDto): Promise<void> {
		return await this.demoService.uploadComplete('APK', body);
	}

	@Put('update/video')
	async uploadCompleteVideo(@Body() body: UpdateVideoLinkInputDto): Promise<void> {
		return await this.demoService.updateVideoLink(body)
	}

	@Delete('link')
	async deleteLink(@Body() body: DeleteLinkInputDto): Promise<void> {
		return await this.demoService.deleteLink(body);
	}

}
