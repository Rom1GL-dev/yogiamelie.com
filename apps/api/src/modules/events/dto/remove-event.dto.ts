import { IsString } from 'class-validator';

export class DeleteEventDto {
  @IsString()
  id?: string;
}
