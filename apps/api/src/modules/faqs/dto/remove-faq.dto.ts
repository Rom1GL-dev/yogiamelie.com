import { IsString } from 'class-validator';

export class DeleteFaqDto {
  @IsString()
  id?: string;
}
