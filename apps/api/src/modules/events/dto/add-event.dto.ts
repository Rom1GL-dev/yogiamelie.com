import { IsDate, IsOptional, IsString } from 'class-validator';

export class AddEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsDate()
  startDate: Date;

  @IsString()
  startHour: string;

  @IsDate()
  endDate: Date;

  @IsString()
  endHour: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  linkRegister: string;

  @IsOptional()
  @IsString()
  location: string;
}
