import { Injectable } from '@nestjs/common'
import axios from 'axios'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { getRandomHeaders } from '@/src/shared/utils/getRandomHeaders.util'

import {
	IManufacturerFacet,
	IManufacturerFacetWithModels
} from './types/manufacturer.types'

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
					headers: getRandomHeaders()
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

	async fetchModels() {
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
						headers: getRandomHeaders()
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
}
