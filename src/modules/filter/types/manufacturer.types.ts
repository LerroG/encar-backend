export interface IManufacturerFacet {
	Action: string
	Count: number
	DisplayValue: string
	Expression: string
	IsSelected: false
	Metadata: IManufacturerMetadata
	Value: string
}

interface IManufacturerMetadata {
	CarType: string[]
	Code: string[]
	EngName: string[]
	Expression: string[]
	Ordering: number[]
	Price: { Min: number; Max: number }[]
}
