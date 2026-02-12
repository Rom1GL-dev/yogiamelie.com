import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SiteWebEntryDto {
  @IsString()
  contentType: string;

  @IsString()
  value: string;

  @IsOptional()
  extra?: any;
}

export class BulkUpsertSectionDto {
  @IsString()
  section: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiteWebEntryDto)
  entries: SiteWebEntryDto[];
}
