import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;