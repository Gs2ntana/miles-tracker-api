import api from './api';
import type { 
  LoginRequest, 
  RegisterRequest, 
  TokenResponse, 
  UsuarioResponse,
  ForgotRequest,
  ResetRequest,
  UsuarioUpRequest,
  UpdateRequest
} from '../types';

export const authService = {
  login: async (credentials: LoginRequest) => {
    const { data } = await api.post<TokenResponse>('/auth/login', credentials);
    return data;
  },

  register: async (userData: RegisterRequest) => {
    await api.post('/auth/register', userData);
  },

  getMe: async () => {
    const { data } = await api.get<UsuarioResponse>('/usuario/me');
    return data;
  },

  forgotPassword: async (dados: ForgotRequest) => {
    await api.post('/auth/forgot-password', dados);
  },

  resetPassword: async (dados: ResetRequest) => {
    await api.post('/auth/reset-password', dados);
  },

  updateProfile: async (dados: UsuarioUpRequest) => {
    const { data } = await api.put<UsuarioResponse>('/usuario/me', dados);
    return data;
  },

  updatePassword: async (dados: UpdateRequest) => {
    await api.put('/usuario/me/senha', dados);
  }
};