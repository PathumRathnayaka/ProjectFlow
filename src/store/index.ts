import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import tasksReducer from './slices/tasksSlice';
import teamsReducer from './slices/teamsSlice';
import uiReducer from './slices/uiSlice';
import calendarReducer from './slices/calenderSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    teams: teamsReducer,
    ui: uiReducer,
    calendar: calendarReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;