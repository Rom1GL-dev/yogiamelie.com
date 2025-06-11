import { IsString } from 'class-validator';

export class DeleteLocationDto {
  @IsString()
  id: string;
}
