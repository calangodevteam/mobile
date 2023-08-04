export interface PageResponse {
	first: boolean,
	last: boolean,
	empty: boolean,
	numberOfElements: number,
    totalElements: number,
	totalPages: number,
}

export interface PageRequest {
	page?: number,
	size?: number,
	sort?: Sort[],
}

export interface Sort {
	orderBy:string,
	direction:string,
}
