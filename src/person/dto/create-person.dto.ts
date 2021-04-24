import { IsString } from 'class-validator'

export class CreatePersonDto {
  @IsString()
  name: string

  @IsString()
  cpf: string

  @IsString()
  password: string

  @IsString()
  birthday_date: string
}
