import { IsEnum, IsInt, IsNumber } from 'class-validator'
import { AccountTypeEnum } from '../enums/account-type.enum'

export class CreateAccountDto {
  @IsInt()
  person_id: number

  @IsNumber()
  daily_withdraw_limit: number

  @IsEnum(AccountTypeEnum)
  type: number
}
