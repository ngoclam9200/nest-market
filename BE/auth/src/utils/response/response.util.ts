import { HttpStatus } from "@nestjs/common";
import { ApiResponse, PaginatedResponse } from "../interface/response.interface";


export function createResponse(status: HttpStatus, message: string, data: any = null) {
    return { status, message, data };
}
