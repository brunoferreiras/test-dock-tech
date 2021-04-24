import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator'

export class GetBankStatementDto {
  @IsInt()
  @IsOptional()
  page: number = 1

  @IsInt()
  @IsOptional()
  @Max(100)
  @Min(1)
  limit: number = 10

  @IsString()
  @IsDateString()
  @IsOptional()
  start_date: string

  @IsString()
  @IsDateString()
  @IsOptional()
  end_date: string
}
