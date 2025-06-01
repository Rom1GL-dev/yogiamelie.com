import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddBlogDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsBoolean()
  published: boolean;
}
