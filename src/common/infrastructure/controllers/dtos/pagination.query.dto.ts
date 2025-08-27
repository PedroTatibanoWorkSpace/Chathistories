
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationQueryDto {

  @Type(() => Number)
  @IsNumber({}, { message: 'O campo "page" deve ser um número válido.' })
  @Min(1, { message: 'O campo "page" deve ser no mínimo 1.' })
  page: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'O campo "limit" deve ser um número válido.' })
  @Min(1, { message: 'O campo "limit" deve ser no mínimo 1.' })
  limit: number;
}
