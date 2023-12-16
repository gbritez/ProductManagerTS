

export interface IDTOResponse {
    status: string,
    totalPages: number,
    prevPage: number,
    nextPage: number,
    page: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevLink: string | null,
    nextLink: string | null,
    payload: any[]
}