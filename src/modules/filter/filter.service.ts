import { Injectable } from '@nestjs/common'

// import axios from 'axios'

import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class FilterService {
	constructor(private prismaService: PrismaService) {}

	// async fetchManufacturers() {
	// 	const response = await axios.get(
	// 		'https://api.encar.com/search/car/list/general',
	// 		{
	// 			params: {
	// 				count: false,
	// 				q: '(And.Hidden.N._.CarType.A.)',
	// 				inav: '|Metadata|Sort'
	// 			}
	// 		}
	// 	)
	// 	const arr = response.data.iNav?.Nodes[1].Facets[0].Refinements.Nodes[0]
	// 		.Facets as Record<string, unknown>[]
	// 	for (const item of arr) {
	// 		if (item.DisplayName) {
	// 			await this.prismaService.manufacturer.upsert({
	// 				where: { name: String(item.DisplayName) },
	// 				update: {},
	// 				create: { name: String(item.DisplayName) }
	// 			})
	// 		}
	// 	}
	// }

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
