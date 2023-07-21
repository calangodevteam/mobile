export interface PageResponse {
	first: boolean,
	last: boolean,
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
