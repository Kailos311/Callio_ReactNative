import {ApiClient} from './ApiClient';
import {
  ChangePasswordBody,
  ChangePasswordResponse,
  ForgotPasswordBody,
  ForgotPasswordResponse,
  LoginBody,
  LoginResponse,
  ResetPasswordBody,
  ResetPasswordResponse,
  SignUpBody,
  UpdateBody,
  UpdateResponse,
  UserResponse,
} from '../types/auth';

const apiClient = new ApiClient();

export const login: (body: LoginBody) => Promise<LoginResponse> = body =>
  apiClient.post('login', body);

export const create: (body: SignUpBody) => Promise<SignUpBody> = body =>
  apiClient.post('user/signup', body);

export const forgotPassword: (
  body: ForgotPasswordBody,
) => Promise<ForgotPasswordResponse> = body =>
  apiClient.post('user/forgotpassword', body);

export const resetPassword: (
  body: ResetPasswordBody,
) => Promise<ResetPasswordResponse> = body =>
  apiClient.put('user/resetpassword', body);

export const changePassword: (
  body: ChangePasswordBody,
) => Promise<ChangePasswordResponse> = body =>
  apiClient.put(`user/change-password/${body.id}`, body);

export const getUserById: (body: {
  id: string;
}) => Promise<UserResponse> = body => apiClient.get(`user/${body.id}`, body);

export const update: (body: UpdateBody) => Promise<UpdateResponse> = body =>
  apiClient.put(`${body.id}`, body);

export const deleteUser: (body: {userId: string}) => Promise<any> = body =>
  apiClient.delete(`user/${body.userId}`, body);
