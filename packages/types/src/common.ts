/**
 * API 响应通用结构
 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应结果
 */
export interface PaginationResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 通用选项
 */
export interface Option<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
