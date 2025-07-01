import { Controller, Get } from '@nestjs/common'

import { FilterService } from './filter.service'

@Controller('filters')
export class FilterController {
	constructor(private readonly filterService: FilterService) {}

	@Get('manufacturers')
	async fetchManufacturers() {
		return this.filterService.fetchManufacturers()
	}
}
