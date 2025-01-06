import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
	IMessage,
	IParamsCreateMessage,
	IParamsMessages,
	MessageWhereUniqueInput,
} from '../interfaces';

@Injectable()
export class MessageService {
	constructor(private prisma: PrismaService) {}

	async message(
		messageWhereUniqueInput: MessageWhereUniqueInput,
	): Promise<IMessage | null> {
		return this.prisma.message.findUnique({
			where: messageWhereUniqueInput,
		});
	}

	async messages(params: IParamsMessages): Promise<IMessage[]> {
		const { skip, take, cursor, where, orderBy } = params;

		return this.prisma.message.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async createMessage(data: IParamsCreateMessage): Promise<IMessage> {
		return this.prisma.message.create({
			data,
		});
	}
}
