import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { IParamsMessages } from '../interfaces';

@Injectable()
export class MessageService {
	constructor(private prisma: PrismaService) {}

	async message(
		messageWhereUniqueInput: Prisma.MessageWhereUniqueInput,
	): Promise<Message | null> {
		return this.prisma.message.findUnique({
			where: messageWhereUniqueInput,
		});
	}

	async messages(params: IParamsMessages): Promise<Message[]> {
		const { skip, take, cursor, where, orderBy } = params;

		return this.prisma.message.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async createMessage(data: {
		text: string;
		User: { connect: { id: string } };
	}): Promise<Message> {
		return this.prisma.message.create({
			data,
		});
	}
}
