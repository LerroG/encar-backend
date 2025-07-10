import { Controller, Get, Param } from '@nestjs/common'

import { FilterService } from './filter.service'

@Controller('filters')
export class FilterController {
	constructor(private readonly filterService: FilterService) {}

	@Get('manufacturers')
	async getManufacturers() {
		return this.filterService.getManufacturers()
	}

	@Get('models')
	async getModels() {
		return this.filterService.getModels()
	}

	@Get('series')
	async getSeries() {
		return this.filterService.getSeries()
	}

	@Get('models/by-manufacturer/:manufacturerId')
	async getModelsByManufacturer(
		@Param('manufacturerId') manufacturerId: string
	) {
		return this.filterService.getModelsByManufacturer(manufacturerId)
	}

	@Get('series/by-model/:modelId')
	async getSeriesByModel(@Param('modelId') modelId: string) {
		return this.filterService.getSeriesByModel(modelId)
	}

	@Get('test')
	async testConnection() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.filterService.testConnection()
	}

	@Get('manufacturers-from-encar')
	async fetchManufacturersFromEncar() {
		return this.filterService.fetchManufacturersFromEncar()
	}

	@Get('models-from-encar')
	async fetchModelsFromEncar() {
		return this.filterService.fetchModelsFromEncar()
	}

	@Get('series-from-encar')
	async fetchSeriesFromEncar() {
		return this.filterService.fetchSeriesFromEncar()
	}
}
