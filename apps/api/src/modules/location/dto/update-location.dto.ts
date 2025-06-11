import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  subtitle: string;

  @IsString()
  @IsOptional()
  lieu: string;

  @IsString()
  @IsOptional()
  parking: string;

  @IsString()
  @IsOptional()
  planning: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsBoolean()
  @IsOptional()
  published: boolean;
}
