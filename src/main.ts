import { NestFactory } from '@nestjs/core'

import { CoreModule } from './core/core.module'

async function bootstrap() {
	const app = await NestFactory.create(CoreModule)
	app.enableCors({
		origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
		credentials: true
	})
	app.setGlobalPrefix('api')
	await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
