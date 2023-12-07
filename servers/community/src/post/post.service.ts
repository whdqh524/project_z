import { Injectable } from '@nestjs/common';
import {
	WebDbConnector, BoardPost, Prisma, GENERAL_BORAD_CATEGORYS, CategoryNotMatch, NoPermission, NotExist, NotFoundData
} from "@project_z_web_backend/common";
import { GetPostInputDto } from "./dto/get.post.dto";
import { CreatePostInputDto } from "./dto/create.post.dto";
import { UpdatePostInputDto } from "./dto/update.post.dto";

@Injectable()
export class PostService {
	constructor(private readonly webDB: WebDbConnector) {}

	async getPosts({board, category, sort, title, content, page, limit, userId}: GetPostInputDto): Promise<any> {
		const conditions: Prisma.BoardPostFindManyArgs = {
			select: {
				id: true, board: true, category: true, title:true, summary: true, views: true,
				commentCount: true, likeCount: true,
				thumbnailImageUrl: true, isFixed: true, createdAt: true,
				user: {select: {id: true, nickname:true, profileImageUrl:true}}
			},
			where: {
				board: board, category: category, status: 'ALIVE',
			}, orderBy: {}, skip: (page-1)*limit, take: limit
		};
		if(userId) {
			Object.assign(conditions.select, {boardLikes: {select: {id:true}, where:{userId: userId}}});
		}
		if(title && content) {
			Object.assign(conditions.where, {OR: [{title: {search: `${title}*`}}, {content: {search: `${content}*`}}]});
		}
		else if(title && !content) {
			Object.assign(conditions.where, {title: {search: `${title}*`}});
		}
		else if(content && !title) {
			Object.assign(conditions.where, {content: {search: `${content}*`}});
		}
		const sortCondition = sort === 'NEW' ? {createdAt: 'desc'}
		: sort === 'LIKE' ? {likeCount: 'desc'}
		: {commentCount: 'desc'}
		Object.assign(conditions.orderBy, sortCondition);


		let fixedPosts: any[];
		if(page-1==0) {
			fixedPosts = await this.webDB.boardPost.findMany({
				select: conditions.select,
				where:{board: board, category: category, status: 'ALIVE', isFixed:true},
				orderBy: {createdAt:'desc'}, take:5
			});
		}
		const transactionQueries: any[] = []
		transactionQueries.push(this.webDB.boardPost.findMany(conditions));
		transactionQueries.push(this.webDB.boardPost.count({where:conditions.where}));
		const [ posts, count] = await this.webDB.$transaction(transactionQueries);
		const resultData: any = fixedPosts.concat(posts).map((data:any) => {
			data.likeByMe = data.boardLikes ? data.boardLikes.length > 0 : false;
			delete data.boardLikes;
			return data;
		});
		return { posts: resultData, count: count};
	}

	async createPost(inputData: CreatePostInputDto): Promise<object> {
		if(!GENERAL_BORAD_CATEGORYS.includes(inputData.category)) throw new CategoryNotMatch();
		const post: BoardPost = await this.webDB.boardPost.create({data: inputData});
		return {postId: post.id};
	}

	async updatePost({title, content, thumbnailImageUrl, status, postId, userId}: UpdatePostInputDto): Promise<void> {
		const postModel: BoardPost = await this.webDB.boardPost.findUnique({where: {id: postId}});
		if(postModel.userId != userId || postModel.board != 'GENERAL' || status == 'DELETED') throw new NoPermission();
		const dataCondition = {};
		if(title) Object.assign(dataCondition, {title: title});
		if(content) Object.assign(dataCondition,{content: content});
		if(thumbnailImageUrl) Object.assign(dataCondition, {thumbnailImageUrl: thumbnailImageUrl});
		if(status) Object.assign(dataCondition, {status: status});

		await this.webDB.boardPost.update({where:{id: postId}, data: dataCondition});
	}

	async deletePost(userId: string, postId: string): Promise<void> {
		const postModel = await this.webDB.boardPost.findUnique({where: {id: postId}});
		if(postModel.userId !== userId) {
			throw new NoPermission();
		}
		if(postModel.status === 'DELETED') {
			throw new NotFoundData()
		}
		await this.webDB.boardPost.update({data:{status: 'DELETED'}, where: {id : postId}});
	}


	async getPostDetail(userId: string, postId: string): Promise<object> {
		await this.webDB.boardPost.update({data:{views:{increment:1}}, where:{id: postId}});
		const conditions = {
			select: {
				id: true, board: true, category: true, title:true, summary: true,
				content: true, views: true, commentCount: true, likeCount: true,
				thumbnailImageUrl: true, isFixed: true, status: true, createdAt: true, updatedAt: true,
				user: {select: {id:true, nickname:true, profileImageUrl:true}},
				_count: {select: {boardComments: true, boardReplies: true}}
			},
			where: {id: postId}
		}
		if(userId) {
			Object.assign(conditions.select,
				{boardLikes:{select: {id: true}, where: {userId: userId}},
					boardComplainDetails:{select:{id:true}, where: {userId: userId}}});
		}
		const postModel: any = await this.webDB.boardPost.findUnique(conditions);

		if(!postModel) {
			throw new NotExist();
		}
		postModel.likeByMe = postModel.boardLikes ? postModel.boardLikes.length > 0 : false;
		postModel.complainByMe = postModel.complainByMe ? postModel.boardComplainDetails.length > 0 : false;
		delete postModel.boardLikes;
		delete postModel.boardComplainDetails;

		return postModel;
	}
}
