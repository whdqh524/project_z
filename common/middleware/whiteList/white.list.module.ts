import { Module } from "@nestjs/common";
import { WhiteListManager } from "./white.list.manager";

@Module({
	providers: [WhiteListManager],
	exports: [WhiteListManager]
})
export class WhiteListModule{}