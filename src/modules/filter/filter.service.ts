import { Injectable } from '@nestjs/common'
import axios from 'axios'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { getHeaders } from '@/src/shared/utils/getHeaders.util'

import {
	IManufacturerFacet,
	IManufacturerFacetWithModels
} from './types/manufacturer.types'

@Injectable()
export class FilterService {
	constructor(private prismaService: PrismaService) {}

	async getManufacturers() {
		return this.prismaService.manufacturer.findMany()
	}

	async getModels() {
		return this.prismaService.model.findMany()
	}

	async getSeries() {
		return this.prismaService.series.findMany()
	}

	async getModelsByManufacturer(manufacturerId: string) {
		return this.prismaService.model.findMany({
			where: { manufacturerId }
		})
	}

	async getSeriesByModel(modelId: string) {
		return this.prismaService.series.findMany({
			where: { modelId }
		})
	}
	async testConnection() {
		try {
			const response = await axios.get(
				'https://api.encar.com/search/car/list/general',
				{
					params: {
						count: false,
						q: '(And.Hidden.N._.CarType.A.)',
						inav: '|Metadata|Sort'
					},
					headers: getHeaders()
				}
			)

			if (!response || !response.data) {
				throw new Error('Не удалось получить данные от encar')
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return response.data
		} catch (error) {
			console.error('Failed to fetch manufacturers:', error)
			throw new Error('Failed to fetch manufacturers')
		}
	}

	async fetchManufacturersFromEncar() {
		try {
			const response = await axios.get(
				'https://api.encar.com/search/car/list/general',
				{
					params: {
						count: false,
						q: '(And.Hidden.N._.CarType.A.)',
						inav: '|Metadata|Sort'
					},
					headers: getHeaders()
				}
			)

			if (!response || !response.data) {
				throw new Error('Не удалось получить данные от encar')
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const arr = response.data.iNav.Nodes[1].Facets[0].Refinements.Nodes[0]
				.Facets as IManufacturerFacet[]

			await Promise.all(
				arr.map(item => {
					const engName = item.Metadata?.EngName?.[0] ?? ''
					const koreanName = item.DisplayValue ?? ''

					return this.prismaService.manufacturer.create({
						data: {
							value: item.Value,
							engName,
							koreanName
						}
					})
				})
			)

			return 'Manufacturers fetched successfully'
		} catch (error) {
			console.error('Failed to fetch manufacturers:', error)
			throw new Error('Failed to fetch manufacturers')
		}
	}

	async fetchModelsFromEncar() {
		const manufacturers = await this.prismaService.manufacturer.findMany()

		for (const manufacturer of manufacturers) {
			try {
				const response = await axios.get(
					'https://api.encar.com/search/car/list/general',
					{
						params: {
							count: false,
							q: `(And.Hidden.N._.(C.CarType.A._.Manufacturer.${manufacturer.value}.))`,
							inav: '|Metadata|Sort'
						},
						headers: getHeaders()
					}
				)

				if (!response || !response.data) {
					throw new Error('Не удалось получить данные от encar')
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const manufacturerFacets = response.data.iNav.Nodes[1].Facets[0]
					.Refinements.Nodes[0].Facets as IManufacturerFacet[]

				const manufacturerObj = manufacturerFacets.find(
					item => item.Value === manufacturer.value
				) as IManufacturerFacetWithModels

				if (
					manufacturerObj &&
					manufacturerObj.Refinements?.Nodes?.[0]?.Facets
				) {
					for (const item of manufacturerObj.Refinements.Nodes[0].Facets) {
						const engName = item.Metadata?.EngName?.[0] ?? ''
						const koreanName = item.DisplayValue ?? ''

						await this.prismaService.model.create({
							data: {
								manufacturerId: manufacturer.id,
								value: item.Value,
								engName,
								koreanName
							}
						})
					}
				}
			} catch (error) {
				console.error(
					`Failed to fetch models for manufacturer ${manufacturer.value}:`,
					error
				)
			}
		}
		return 'Models fetched successfully'
	}

	async fetchSeriesFromEncar() {
		const models = await this.prismaService.model.findMany({
			include: { manufacturer: true }
		})
		for (const model of models) {
			try {
				const response = await axios.get(
					'https://api.encar.com/search/car/list/general',
					{
						params: {
							count: false,
							q: `(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${model.manufacturer.value}._.ModelGroup.${model.value}.)))`,
							inav: '|Metadata|Sort'
						},
						headers: getHeaders()
					}
				)

				if (!response || !response.data) {
					throw new Error('Не удалось получить данные от encar')
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const arr = response.data.iNav.Nodes[1].Facets[0].Refinements.Nodes[0]
					.Facets as IManufacturerFacet[]
				const manufacturerObj = arr.find(
					item => item.Value === model.manufacturer.value
				) as IManufacturerFacetWithModels

				if (
					manufacturerObj &&
					manufacturerObj.Refinements &&
					Array.isArray(manufacturerObj.Refinements.Nodes)
				) {
					const nodes = manufacturerObj.Refinements.Nodes
					if (nodes.length > 0 && Array.isArray(nodes[0].Facets)) {
						const modelObj = nodes[0].Facets.find(
							item => item.Value === model.value
						) as IManufacturerFacetWithModels
						if (
							modelObj &&
							modelObj.Refinements &&
							Array.isArray(modelObj.Refinements.Nodes)
						) {
							const nodes = modelObj.Refinements.Nodes
							if (nodes.length > 0 && Array.isArray(nodes[0].Facets)) {
								const seriesArr = nodes[0]
									.Facets as IManufacturerFacetWithModels[]
								for (const facet of seriesArr) {
									const metadata = facet.Metadata as { EngName?: string[] }
									const value = facet.Value
									const engName = metadata?.EngName?.[0] ?? ''
									const koreanName = facet.DisplayValue ?? ''
									await this.prismaService.series.create({
										data: {
											modelId: model.id,
											value,
											engName,
											koreanName
										}
									})
								}
							}
						}
					}
				}
			} catch (error) {
				console.error(
					`Failed to fetch series for manufacturer ${model.manufacturer.value}, model ${model.value}:`,
					error
				)
			}
		}
		return 'Series fetched successfully'
	}
}
