import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  refresh: string | null;
  category?: string;
}

const initialState: AuthState = {
  refresh: null,
  category: "all",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.refresh = action.payload;
    },
    clearToken(state) {
      state.refresh = null;
    },
    setCategory: (state, { payload }) => {
      state.category = payload;
    },
  },
});

export const { setToken, setCategory } = authSlice.actions;
export default authSlice.reducer;
