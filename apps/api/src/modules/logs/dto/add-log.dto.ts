import { IsString } from 'class-validator';

export class AddLogDto {
  @IsString()
  type: string;

  @IsString()
  message: string;

  @IsString()
  userId: string;
}
