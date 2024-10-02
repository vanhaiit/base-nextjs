export interface APIErrorResponse<T = any> {
  status: number;
  data: {
    code: number;
    data: T;
    message: string;
  };
}

export interface APIResponse<T, M = APIMetadata> {
  code?: number;
  data: T;
  message: string;
  success: boolean;
  meta?: M;
}

export interface APIMetadata {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  perPage: number;
  total: number;
}

export enum EDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface IParamsQuery {
  limit?: number;
  orderBy?: string;
  direction?: EDirection;
  page?: number;
}
