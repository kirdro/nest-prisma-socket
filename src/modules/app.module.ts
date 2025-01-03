import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { PrismaService } from '../services/prisma.service';
import { EventsModule } from './events.module';

@Module({
	imports: [EventsModule],
	controllers: [AppController],
	providers: [AppService, PrismaService, UserService, PostService],
})
export class AppModule {}
