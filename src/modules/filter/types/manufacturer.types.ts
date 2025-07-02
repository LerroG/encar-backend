export interface IManufacturerFacet {
	Action: string
	Count: number
	DisplayValue: string
	Expression: string
	IsSelected: boolean
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

export interface IManufacturerFacetWithModels extends IManufacturerFacet {
	Refinements: {
		BreadCrumbs: []
		Nodes: IManufacturerFacetWithModelsNode[]
	}
}

interface IManufacturerFacetWithModelsNode {
	DisplayName: string
	Facets: IManufacturerFacetWithModelsNodeFacet[]
	IsSelected: boolean
	Metadata: object
	MultiSelectMode: string
	Name: string
	PlaceholderExpression: string
	RemoveAction: string
	Type: string
}

export interface IManufacturerFacetWithModelsNodeFacet {
	Action: string
	Count: number
	DisplayValue: string
	Expression: string
	IsSelected: false
	Metadata: IManufacturerFacetWithModelsNodeFacetMetadata
	Value: string
}

interface IManufacturerFacetWithModelsNodeFacetMetadata {
	Code: string[]
	EngName: string[]
	Ordering: number[]
	Price: { Min: number; Max: number }[]
}
