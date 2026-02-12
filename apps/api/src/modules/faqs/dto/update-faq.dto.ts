import { IsOptional, IsString } from 'class-validator';

export class UpdateFaqDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  answer: string;

  @IsOptional()
  @IsString()
  response: string;
}
