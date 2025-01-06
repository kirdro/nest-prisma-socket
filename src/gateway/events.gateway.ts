import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { Post as PostModel, User as UserModel } from '.prisma/client';
import { IDataBodyCreateMessage, IErr } from '../interfaces';
import { MessageService } from '../services/message.service';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class EventsGateway {
	constructor(
		private readonly userService: UserService,
		private readonly postService: PostService,
		private readonly messageService: MessageService,
	) {}
	@WebSocketServer()
	server: Server;

	@SubscribeMessage('events')
	async findAll(): Promise<UserModel[]> {
		return await this.userService.users({});
	}

	@SubscribeMessage('getAllPosts')
	async getAllPosts(): Promise<PostModel[]> {
		return await this.postService.posts({});
	}

	@SubscribeMessage('createMessage')
	async createMessage(
		@MessageBody()
		messageData: IDataBodyCreateMessage,
	) {
		const { id, text } = messageData;
		await this.messageService.createMessage({
			text,
			userImg: {
				connect: { id },
			},
			userName: {
				connect: { id },
			},
			user: {
				connect: { id },
			},
		});
		const messages = await this.messageService.messages({});
		this.server.emit('createMessage', messages);
	}

	@SubscribeMessage('createPost')
	async createPost(
		@MessageBody()
		postData: {
			title: string;
			content?: string;
			id: string;
			userImg: string;
			userName: string;
		},
	) {
		const { title, content, id, userImg, userName } = postData;
		await this.postService.createPost({
			name: title,
			content,
			userImg,
			userName,
			createdBy: {
				connect: { id },
			},
		});
		const posts = await this.postService.posts({});
		this.server.emit('createPost', posts);
		// return await this.postService.posts({});
	}

	@SubscribeMessage('createUser')
	async createUser(
		@MessageBody()
		userData: {
			name?: string;
			email: string;
		},
	): Promise<UserModel | IErr> {
		const { name, email } = userData;
		return await this.userService.createUser({
			name,
			email,
		});
	}

	@SubscribeMessage('deleteUser')
	async deleteUser(
		@MessageBody()
		userData: {
			email: string;
			id: string;
		},
	): Promise<UserModel | IErr> {
		const { id, email } = userData;
		return await this.userService.deleteUser({
			id,
			email,
		});
	}

	@SubscribeMessage('identity')
	async identity(@MessageBody() data: number): Promise<number> {
		return data;
	}
}
