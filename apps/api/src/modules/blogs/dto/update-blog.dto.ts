import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsBoolean()
  published: boolean;
}
