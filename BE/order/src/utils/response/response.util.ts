import { HttpStatus } from "@nestjs/common";
import { ApiResponse, PaginatedResponse } from "../interface/response.interface";


export function createResponse(status: HttpStatus, message: string, data: any = null) {
    return { status, message, data };
}

export function createPaginatedResponse<T>(
    status: HttpStatus,
    message: string,
    list: T[],
    total_record: number,
    page: number,
    limit: number
): ApiResponse<PaginatedResponse<T>> {

    const response: PaginatedResponse<T> = {
        list,
        total_record,
        page: page,
        limit:limit
    };
    return {
        status,
        message,
        data: response,
    };
}