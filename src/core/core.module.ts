import { Module } from '@nestjs/common'

import { FilterModule } from '../modules/filter/filter.module'

import { PrismaModule } from './prisma/prisma.module'

@Module({
	imports: [PrismaModule, FilterModule]
})
export class CoreModule {}
