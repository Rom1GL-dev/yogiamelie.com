import { IsOptional, IsString, IsUrl } from 'class-validator';

export class AddLinkDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  youtube?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  tiktok?: string;

  @IsOptional()
  @IsString()
  facebook?: string;
}
