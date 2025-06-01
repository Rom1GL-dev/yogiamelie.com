import { IsOptional, IsString } from 'class-validator';

export class AddSiteWebDetailDto {
  @IsString()
  section: string;

  @IsString()
  contentType: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  extra?: any;
}
