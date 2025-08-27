import { IsString, IsOptional, IsUUID } from 'class-validator'
import { PaginationQueryDto } from 'src/common/infrastructure/controllers/dtos/pagination.query.dto';

export class PaginateChatsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  kind?: string;

  @IsOptional()
  @IsUUID()
  accountId?: string;

  @IsOptional()
  @IsUUID()
  phoneId?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
