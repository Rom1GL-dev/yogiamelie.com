import { IsString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  type: string;

  @IsString()
  message: string;

  @IsString()
  userId: string;
}
