import { IsString } from "class-validator";
import { IExampleDto } from "./file-upload.dto";

export class DownFileDto implements Pick<IExampleDto, 'key'> {
    @IsString()
    key: string;
}