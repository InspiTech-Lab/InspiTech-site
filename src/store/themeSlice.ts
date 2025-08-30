import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
  isTransitioning: boolean;
}

const initialState: ThemeState = {
  isDarkMode: true,
  isTransitioning: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isTransitioning = true;
      state.isDarkMode = !state.isDarkMode;
    },
    setTransitionComplete: (state) => {
      state.isTransitioning = false;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTransitionComplete, setTheme } = themeSlice.actions;
export default themeSlice.reducer;