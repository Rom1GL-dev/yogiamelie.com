import { IsOptional, IsString } from 'class-validator';

export class AddPriceDto {
  @IsString()
  label: string;

  @IsString()
  number: string;

  @IsString()
  @IsOptional()
  extra?: string;

  @IsString()
  price: string;

  @IsString()
  @IsOptional()
  info?: string;
}
