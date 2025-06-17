import { IsString } from 'class-validator';

export class DeletePriceDto {
  @IsString()
  id: string;
}
