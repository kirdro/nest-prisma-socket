import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Uncomment these lines to use the Redis adapter:
	// const redisIoAdapter = new RedisIoAdapter(app);
	// await redisIoAdapter.connectToRedis();
	// app.useWebSocketAdapter(redisIoAdapter);

	await app.listen(3005);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
