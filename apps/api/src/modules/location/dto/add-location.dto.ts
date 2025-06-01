import { IsString } from 'class-validator';

export class AddLocationDto {
  @IsString()
  title: string;
}
