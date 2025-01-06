import { Prisma } from '@prisma/client';

export interface IErr {
	err: string;
}

export interface MessageWhereUniqueInput {
	id?: number;
	AND?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
	OR?: MessageWhereUniqueInput[];
	NOT?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
	text?: Prisma.StringFilter<'Message'> | string;
	createdAt?: Prisma.DateTimeFilter<'Message'> | Date | string;
	updatedAt?: Prisma.DateTimeFilter<'Message'> | Date | string;
	userId?: Prisma.StringFilter<'Message'> | string;
	userImg?: Prisma.StringFilter<'Message'> | string;
	userName?: Prisma.StringFilter<'Message'> | string;
	User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}

export interface IMessage {
	id: number;
	text: string;
	userImg: string;
	userName: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
}

export interface IParamsMessages {
	skip?: number;
	take?: number;
	cursor?: Prisma.MessageWhereUniqueInput;
	where?: IMessageWhereInput;
	orderBy?: IMessageOrderByWithRelationInput;
}

export interface IMessageWhereInput {
	AND?: IMessageWhereInput | IMessageWhereInput[];
	OR?: IMessageWhereInput[];
	NOT?: IMessageWhereInput | IMessageWhereInput[];
	id?: Prisma.IntFilter<'Message'> | number;
	text?: Prisma.StringFilter<'Message'> | string;
	createdAt?: Prisma.DateTimeFilter<'Message'> | Date | string;
	updatedAt?: Prisma.DateTimeFilter<'Message'> | Date | string;
	userImg?: Prisma.StringFilter<'Message'> | string;
	userName?: Prisma.StringFilter<'Message'> | string;
	User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}

export interface IMessageOrderByWithRelationInput {
	id?: Prisma.SortOrder;
	text?: Prisma.SortOrder;
	createdAt?: Prisma.SortOrder;
	updatedAt?: Prisma.SortOrder;
	userId?: Prisma.SortOrder;
	userImg?: Prisma.SortOrder;
	userName?: Prisma.SortOrder;
	user?: Prisma.UserOrderByWithRelationInput;
}

export interface IParamsCreateMessage {
	text: string;
	content?: string | null;
	createdAt?: Date | string;
	updatedAt?: Date | string;
	userImg: Prisma.UserCreateNestedOneWithoutPostsInput;
	userName: Prisma.UserCreateNestedOneWithoutPostsInput;
	user: Prisma.UserCreateNestedOneWithoutPostsInput;
}

export interface IDataBodyCreateMessage {
	text: string;
	id: string;
	userImg?: string;
	userName?: string;
}
