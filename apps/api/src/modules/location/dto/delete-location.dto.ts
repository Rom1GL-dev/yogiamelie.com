import { IsString } from 'class-validator';

export class DeleteLocationDto {
  @IsString()
  title: string;
}
