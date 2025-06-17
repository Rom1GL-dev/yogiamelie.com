import { IsOptional, IsString } from 'class-validator';

export class UpdatePriceDto {
  @IsString()
  @IsOptional()
  id: string;
  @IsString()
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
