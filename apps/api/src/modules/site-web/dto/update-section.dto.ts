import { IsOptional, IsString } from 'class-validator';

export class UpdateSiteWebDetailDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsString()
  contentType?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  extra?: any;
}
