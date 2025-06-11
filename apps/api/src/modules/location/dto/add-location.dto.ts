import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddLocationDto {
  @IsString()
  title: string;
  @IsString()
  subtitle: string;
  @IsString()
  @IsOptional()
  lieu?: string;
  @IsString()
  @IsOptional()
  parking?: string;
  @IsString()
  @IsOptional()
  planning?: string;
  @IsString()
  image: string;
  @IsBoolean()
  published: boolean;
}
