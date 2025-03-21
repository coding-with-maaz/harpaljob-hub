import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'user' | 'employer' | 'admin';
  } | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; 