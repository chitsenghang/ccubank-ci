import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class ExchangeRateDto {
  @IsNotEmpty()
  @IsNumber()
  ccuBuy: number;

  @IsNotEmpty()
  @IsNumber()
  ccuSell: number;
}

export class StandardBankingForeignExchangeDto {
  @IsNotEmpty()
  @IsString()
  currencyName: string;

  @ValidateNested()
  @Type(() => ExchangeRateDto)
  cashRate: ExchangeRateDto;

  @ValidateNested()
  @Type(() => ExchangeRateDto)
  noneCashRate: ExchangeRateDto;
}
