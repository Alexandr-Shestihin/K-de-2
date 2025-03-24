import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем интерфейс для состояния аутентификации
interface AuthState {
  isAuth: boolean;
  user: {
    username: string; // Или другие данные пользователя
    accessLevel: number;
    [key: string]: any; // Позволяет добавлять другие свойства
  } | null;
}

// Получаем данные из localStorage при инициализации
const storedAuth = localStorage.getItem('auth');

// Определяем начальное состояние
const initialState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      isAuth: false,
      user: null,
    };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<{ username: string; accessLevel: number; [key: string]: any }>) => {
      state.isAuth = true;
      state.user = action.payload;
      // Сохраняем в localStorage
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state: AuthState) => {
      state.isAuth = false;
      state.user = null;
      // Удаляем из localStorage
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;