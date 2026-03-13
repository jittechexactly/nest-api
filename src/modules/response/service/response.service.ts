import { Injectable } from "@nestjs/common";
import { ResponseDto } from "../dto/response.dto";

@Injectable()
export class ResponseService {
    response(successStatus: boolean, message: string, data: object): ResponseDto {
        return {
            success: successStatus,
            message: message,
            data: data
        }
    }
}