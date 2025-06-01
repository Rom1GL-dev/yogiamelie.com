import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  subtitle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsString()
  @IsOptional()
  startHour: string;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsString()
  @IsOptional()
  endHour: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  linkRegister: string;

  @IsOptional()
  @IsString()
  location: string;
}
