import { IsOptional, IsString } from 'class-validator';

export class UpdatePriceDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  label: string;

  @IsString()
  @IsOptional()
  number: string;

  @IsString()
  @IsOptional()
  extra?: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  info?: string;
}
