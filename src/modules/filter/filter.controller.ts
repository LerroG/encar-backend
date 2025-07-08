import { Controller, Get } from '@nestjs/common'

import { FilterService } from './filter.service'

@Controller('filters')
export class FilterController {
	constructor(private readonly filterService: FilterService) {}

	@Get('test')
	async testConnection() {
		return this.filterService.testConnection()
	}

	@Get('manufacturers')
	async fetchManufacturers() {
		return this.filterService.fetchManufacturers()
	}

	@Get('models')
	async fetchModels() {
		return this.filterService.fetchModels()
	}

	@Get('series')
	async fetchSeries() {
		return this.filterService.fetchSeries()
	}
}
