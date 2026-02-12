import { IsString } from 'class-validator';

export class AddFaqDto {
  @IsString()
  answer: string;

  @IsString()
  response: string;
}
