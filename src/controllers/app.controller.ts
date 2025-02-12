import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { Post as PostModel, User as UserModel } from '@prisma/client';
import { IErr } from '../interfaces';

@Controller()
export class AppController {
	constructor(
		private readonly userService: UserService,
		private readonly postService: PostService,
	) {}

	@Get('post/:id')
	async getPostById(@Param('id') id: string): Promise<PostModel> {
		return this.postService.post({ id: Number(id) });
	}

	@Get('feed')
	async getPublishedPosts(): Promise<PostModel[]> {
		return this.postService.posts({
			where: { published: true },
		});
	}

	@Get('filtered-posts/:searchString')
	async getFilteredPosts(
		@Param('searchString') searchString: string,
	): Promise<PostModel[]> {
		return this.postService.posts({
			where: {
				OR: [
					{
						name: { contains: searchString },
					},
					{
						content: { contains: searchString },
					},
				],
			},
		});
	}

	@Post('post')
	async createDraft(
		@Body()
		postData: {
			title: string;
			content?: string;
			authorEmail: string;
			userImg: string;
			userName: string;
		},
	): Promise<PostModel> {
		const { title, content, authorEmail, userImg, userName } = postData;
		return this.postService.createPost({
			name: title,
			content,
			userImg,
			userName,
			createdBy: {
				connect: { email: authorEmail },
			},
		});
	}

	@Post('user')
	async signupUser(
		@Body() userData: { name?: string; email: string },
	): Promise<UserModel | IErr> {
		return this.userService.createUser(userData);
	}

	@Put('publish/:id')
	async publishPost(@Param('id') id: string): Promise<PostModel> {
		return this.postService.updatePost({
			where: { id: Number(id) },
			data: { published: true },
		});
	}

	@Delete('post/:id')
	async deletePost(@Param('id') id: string): Promise<PostModel> {
		return this.postService.deletePost({ id: Number(id) });
	}
}
