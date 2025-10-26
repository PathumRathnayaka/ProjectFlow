import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllTasks, createTask, updateTask, deleteTask } from '../api/apiService';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'scheduled' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectId: string;
  assigneeId: string;
  reporterId: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await getAllTasks();
  return tasks.map((task: any) => ({
    ...task,
    id: task._id,
    tags: task.tags || [],
  }));
});

export const addTaskAsync = createAsyncThunk('tasks/addTaskAsync', async (data: Omit<Task, 'id'>) => {
  const newTask = await createTask(data);
  return { ...newTask, id: newTask._id, tags: newTask.tags || [] };
});

export const updateTaskAsync = createAsyncThunk('tasks/updateTaskAsync', async ({ id, data }: { id: string; data: Partial<Task> }) => {
  const updated = await updateTask(id, data);
  return { ...updated, id: updated._id, tags: updated.tags || [] };
});

export const deleteTaskAsync = createAsyncThunk('tasks/deleteTaskAsync', async (id: string) => {
  await deleteTask(id);
  return id;
});

export const updateTaskStatusAsync = createAsyncThunk('tasks/updateTaskStatusAsync', async ({ id, status }: { id: string; status: Task['status'] }) => {
  const updated = await updateTask(id, { status });
  return { ...updated, id: updated._id, tags: updated.tags || [] };
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;