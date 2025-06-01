import { IsString } from 'class-validator';

export class DeleteBlogDto {
  @IsString()
  id?: string;
}
