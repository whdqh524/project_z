import { Controller, Post, Get, Body, Query, UseGuards } from "@nestjs/common";
import { SignedUrlDto } from "./dto/signed.url.dto";
import { AuthGuard, PermissionGuard } from "../middleware";
import { S3Provider } from "@project_z_web_backend/common";
@UseGuards(AuthGuard,PermissionGuard)
@Controller('file')
export class FileController {
  constructor(
    private readonly s3Provider: S3Provider
  ) {}

  @Get('signedUrl/image')
  async getAdminList(@Query() inputData: SignedUrlDto): Promise<object> {
    const promises: Promise<any>[] = [];
    const signedUrlMap = {};
    for(const fileName of inputData.files){
      promises.push(this.s3Provider.genImageUrl(fileName).then(url => {
        signedUrlMap[fileName] = url;
      }))
    }
    await Promise.all(promises);
    return {signedUrlMap};
  }
}
