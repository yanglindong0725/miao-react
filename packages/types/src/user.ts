/**
 * 用户信息
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * 用户角色
 */
export enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

/**
 * 用户状态
 */
export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Banned = "banned",
}
