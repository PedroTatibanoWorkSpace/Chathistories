import { PaginatedResult, PaginationParams } from "../pagination/pagination.types";

export interface BaseRepositoryPort<T, Q> {
  findById(id: string): Promise<T | null>;
  paginate(query: Q, params: PaginationParams): Promise<PaginatedResult<T>>;
  create(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
