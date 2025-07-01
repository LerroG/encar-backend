import { Injectable } from '@nestjs/common'
import axios from 'axios'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { IManufacturerFacet } from './types/manufacturer.types'

@Injectable()
export class FilterService {
	constructor(private prismaService: PrismaService) {}

	async fetchManufacturers() {
		try {
			const response = await axios.get(
				'https://api.encar.com/search/car/list/general',
				{
					params: {
						count: false,
						q: '(And.Hidden.N._.CarType.A.)',
						inav: '|Metadata|Sort'
					},
					headers: {
						Accept: 'application/json, text/javascript, */*; q=0.01',
						'Accept-Encoding': 'gzip, deflate, br, zstd',
						'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
						Origin: 'http://www.encar.com',
						Referer: 'http://www.encar.com/',
						'Sec-Ch-Ua':
							'"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
						'Sec-Ch-Ua-Mobile': '?0',
						'Sec-Ch-Ua-Platform': '"Windows"',
						'Sec-Fetch-Dest': 'empty',
						'Sec-Fetch-Mode': 'cors',
						'Sec-Fetch-Site': 'cross-site',
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
						Priority: 'u=1, i'
					}
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

	// async fetchModels(manufacturer: string) {
	// 	const response = await axios.get(
	// 		'https://api.encar.com/search/car/list/general',
	// 		{
	// 			params: {
	// 				count: false,
	// 				q: `(And.Hidden.N._.(C.CarType.A._.Manufacturer.${manufacturer}.))`,
	// 				inav: '|Metadata|Sort'
	// 			}
	// 		}
	// 	)
	// 	const arr = response.data.iNav?.Nodes[1].Facets[0].Refinements.Nodes[0]
	// 		.Facets as Record<string, unknown>[]
	// 	for (const item of arr) {
	// 		if (item.DisplayName) {
	// 			const manufacturerRecord =
	// 				await this.prismaService.manufacturer.findUnique({
	// 					where: { name: manufacturer }
	// 				})
	// 			if (manufacturerRecord) {
	// 				await this.prismaService.model.upsert({
	// 					where: { name: String(item.DisplayName) },
	// 					update: {},
	// 					create: {
	// 						name: String(item.DisplayName),
	// 						manufacturerId: manufacturerRecord.id
	// 					}
	// 				})
	// 			}
	// 		}
	// 	}
	// }

	// async fetchSeries(manufacturer: string, model: string) {
	// 	const response = await axios.get(
	// 		'https://api.encar.com/search/car/list/general',
	// 		{
	// 			params: {
	// 				count: false,
	// 				q: `(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${manufacturer}._.ModelGroup.${model}.)))`,
	// 				inav: '|Metadata|Sort'
	// 			}
	// 		}
	// 	)
	// 	const arr = response.data.iNav?.Nodes[1].Facets[0].Refinements.Nodes[0]
	// 		.Facets as Record<string, unknown>[]
	// 	for (const item of arr) {
	// 		if (item.DisplayName) {
	// 			const modelRecord = await this.prismaService.model.findUnique({
	// 				where: { name: model }
	// 			})
	// 			if (modelRecord) {
	// 				await this.prismaService.series.upsert({
	// 					where: { name: String(item.DisplayName) },
	// 					update: {},
	// 					create: {
	// 						name: String(item.DisplayName),
	// 						modelId: modelRecord.id
	// 					}
	// 				})
	// 			}
	// 		}
	// 	}
	// }

	// async fetchEngineCapacity(
	// 	manufacturer: string,
	// 	model: string,
	// 	series: string
	// ) {
	// 	const response = await axios.get(
	// 		'https://api.encar.com/search/car/list/general',
	// 		{
	// 			params: {
	// 				count: false,
	// 				q: `(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${manufacturer}._.ModelGroup.${model}.)))`,
	// 				inav: '|Metadata|Sort'
	// 			}
	// 		}
	// 	)
	// 	const arr = response.data.iNav?.Nodes[1].Facets[0].Refinements.Nodes[0]
	// 		.Facets as Record<string, unknown>[]
	// 	for (const item of arr) {
	// 		if (item.DisplayName) {
	// 			const seriesRecord = await this.prismaService.series.findUnique({
	// 				where: { name: series }
	// 			})
	// 			if (seriesRecord && item.DisplayName) {
	// 				await this.prismaService.engineCapacity.upsert({
	// 					where: { value: Number(item.DisplayName) },
	// 					update: {},
	// 					create: {
	// 						value: Number(item.DisplayName),
	// 						seriesId: seriesRecord.id
	// 					}
	// 				})
	// 			}
	// 		}
	// 	}
	// }
}
