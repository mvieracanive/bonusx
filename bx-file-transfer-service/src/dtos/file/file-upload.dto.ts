import { IsOptional, IsString, MaxLength } from 'class-validator';
import { IsMaxSize } from 'src/validators/is-max-size.validator';

export interface IExampleDto {
  key: string;
  imgBase64: string;
  description?: string;
}

export class UpFileDto implements IExampleDto {
  @IsString()
  key: string;

  @IsString()
  @IsMaxSize(256000)
  imgBase64: string;

  @IsOptional()
  @IsString()
  description: string | undefined;
}
