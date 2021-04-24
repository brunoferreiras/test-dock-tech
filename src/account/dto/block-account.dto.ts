import { IsBoolean } from 'class-validator'

export class BlockAccountDto {
  @IsBoolean()
  block: boolean
}
