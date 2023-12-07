import { Injectable } from '@nestjs/common';
import { WebDbConnector, RedisManager, WorldPost, Prisma, WORLD_CATEGORY, CategoryNotMatch, NoPermission, NotExist }
	from "@project_z_web_backend/common";
import { GetPostInputDto } from "./dto/get.post.dto";
import { CreatePostInputDto } from "./dto/create.post.dto";
import { UpdatePostInputDto } from "./dto/update.post.dto";

@Injectable()
export class PostService {
	constructor(private readonly webDB: WebDbConnector,
	            private  readonly redisManager: RedisManager) {}

	async getPosts({category, sort, select, search, page, limit, userId}: GetPostInputDto): Promise<any> {
		const conditions: Prisma.WorldPostFindManyArgs = {
			select: {
				id: true, category: true, mapGUID: true, title:true, summary: true,
				playCount: true, likeCount: true,
				thumbnailImageUrl: true, createdAt: true,
				user: {select: {id: true, nickname:true, profileImageUrl:true}},
			},
			where: {
				status: 'ALIVE'
			}, orderBy: {}, skip: (page-1)*limit, take: limit
		};
		if(userId) {
			Object.assign(conditions.select, {worldLikes:{select: {id: true}, where: {userId: userId}}});
		}
		switch (select) {
			case 'FAVORITE':
				Object.assign(conditions.where, {worldFavorites: {some: {userId: userId}}});
				break;
			case 'RECENT_PLAY':
				Object.assign(conditions.where, {worldPlayLogs: {some: {userId: userId}}})
				break;
			case 'MY_WORLD':
				Object.assign(conditions.where, {userId: userId});
				break;
			default:
				if(category && category != 'ALL') {
					Object.assign(conditions.where, {category: category});
				}
				if(search) {
					Object.assign(conditions.where, {OR: [{tag: {search: `${search}*`}}, {title: {search: `${search}*`}}, {summary: {search: `${search}*`}}]});
				}
				break;
		}


		const sortCondition = sort === 'NEW' ? {createdAt: 'desc'}
			: sort === 'LIKE' ? {likeCount: 'desc'}
				: {playCount: 'desc'}
		Object.assign(conditions.orderBy, sortCondition);

		const transactionQueries: any[] = []
		transactionQueries.push(this.webDB.worldPost.findMany(conditions));
		transactionQueries.push(this.webDB.worldPost.count({where:conditions.where}));
		const [ posts, count] = await this.webDB.$transaction(transactionQueries);
		const resultData = posts.map((data:any) => {
			data.likeByMe = data.worldLikes ? data.worldLikes.length > 0 : false
			delete data.worldLikes;
			return data;
		})
		return { posts: resultData, count: count};
	}

	async createPost(inputData: CreatePostInputDto): Promise<object> {
		if(inputData.category != 'USER') throw new NoPermission();
		if(!WORLD_CATEGORY.includes(inputData.category)) throw new CategoryNotMatch();

		const createData = {
			userId: inputData.userId, mapGUID: inputData.mapGUID, category: inputData.category,
			tag: inputData.tag.join(', '), title: inputData.title, summary: inputData.summary,
			content: inputData.content, thumbnailImageUrl: inputData.thumbnailImageUrl
		}
		const post: WorldPost = await this.webDB.worldPost.create({data: createData});
		if(inputData.tag && inputData.tag.length > 0) {
			const promises = [];
			for(const tag of inputData.tag) {
				promises.push(this.redisManager.client.zIncrBy(`WorldTagRank`, 1, tag))
			}
			await Promise.all(promises);
		}
		return {postId: post.id};
	}

	async updatePost({title, summary, content, thumbnailImageUrl, status, postId, userId}: UpdatePostInputDto): Promise<void> {
		const postModel: WorldPost = await this.webDB.worldPost.findUnique({where: {id: postId}});
		if(postModel.userId != userId) throw new NoPermission();
		const dataCondition = {};
		if(title) Object.assign(dataCondition, {title: title});
		if(summary) Object.assign(dataCondition, {summary: summary});
		if(content) Object.assign(dataCondition,{content: content});
		if(thumbnailImageUrl) Object.assign(dataCondition, {thumbnailImageUrl: thumbnailImageUrl});
		if(status) Object.assign(dataCondition, {status: status});

		await this.webDB.boardPost.update({where:{id: postId}, data: dataCondition});
	}

	async playWorldPost(userId: string, postId: string): Promise<void> {
		await this.webDB.worldPost.update({data:{playCount:{increment:1}}, where:{id: postId}});
		await this.webDB.worldPlayLog.upsert({
			create: {
				userId, postId
			},
			update: {
				updatedAt: new Date()
			},
			where: {userId_postId: {userId: userId, postId: postId}}
		});
	}

	async getPostDetail(userId: string, postId: string): Promise<object> {
		const conditions = {
			select: {
				id: true, category: true, title:true, summary: true,
				content: true, playCount: true, likeCount: true, mapGUID: true,
				thumbnailImageUrl: true, status: true, createdAt: true, updatedAt: true,
				user: {select: {id:true, nickname:true, profileImageUrl:true}},
			},
			where: {id: postId}
		}
		if(userId) {
			Object.assign(conditions.select,
				{worldLikes:{select: {id: true}, where: {userId}},worldFavorites: {select: {id: true}, where: {userId}}});
		}
		const postModel: any = await this.webDB.worldPost.findUnique(conditions);
		if(!postModel) {
			throw new NotExist();
		}
		postModel.likeByMe = postModel.worldLikes ? postModel.worldLikes.length > 0 : false;
		delete postModel.worldLikes;
		postModel.favoriteByMe = postModel.worldFavorites ? postModel.worldFavorites.length > 0 : false;
		delete postModel.worldFavorites;
		return postModel;
	}

	async getWorldKeywordRank(): Promise<object> {
		const result = await this.redisManager.client.zRange('WorldTagRank', 0, 5, {REV:true});
		return {keywords: result};
	}
}
