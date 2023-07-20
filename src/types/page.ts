export interface PageResponse {
    empty: boolean,
	first: boolean,
	last: boolean,
	number: number,
	numberOfElements: number,
    totalElements: number,
	totalPages: number
}

export interface PageRequest {
	page?: number,
	size?: number,
	sort?: Sort[],
}

interface Sort {
	orderBy:string,
	direction:string,
}
