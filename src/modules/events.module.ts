import { Module } from '@nestjs/common';
import { EventsGateway } from '../gateway/events.gateway';
import { PrismaService } from '../services/prisma.service';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';

@Module({
	providers: [EventsGateway, PrismaService, UserService, PostService],
})
export class EventsModule {}
