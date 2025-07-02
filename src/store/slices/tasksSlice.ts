import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [
    {
      id: '1',
      title: 'Design Homepage Mockup',
      description: 'Create high-fidelity mockup for the new homepage design',
      status: 'completed',
      priority: 'high',
      projectId: '1',
      assigneeId: '1',
      reporterId: '1',
      dueDate: '2024-01-25',
      estimatedHours: 16,
      actualHours: 14,
      tags: ['design', 'ui/ux'],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-24T16:30:00Z',
    },
    {
      id: '2',
      title: 'Implement User Authentication',
      description: 'Set up secure user authentication system with JWT tokens',
      status: 'in-progress',
      priority: 'urgent',
      projectId: '2',
      assigneeId: '2',
      reporterId: '2',
      dueDate: '2024-02-05',
      estimatedHours: 24,
      actualHours: 18,
      tags: ['backend', 'security'],
      createdAt: '2024-01-20T09:00:00Z',
      updatedAt: '2024-01-30T11:15:00Z',
    },
    {
      id: '3',
      title: 'Content Strategy Planning',
      description: 'Develop comprehensive content strategy for Q1 campaign',
      status: 'scheduled',
      priority: 'medium',
      projectId: '3',
      assigneeId: '3',
      reporterId: '3',
      dueDate: '2024-02-10',
      estimatedHours: 12,
      actualHours: 0,
      tags: ['marketing', 'content'],
      createdAt: '2024-02-01T14:00:00Z',
      updatedAt: '2024-02-01T14:00:00Z',
    },
    {
      id: '4',
      title: 'API Documentation',
      description: 'Create comprehensive API documentation for all endpoints',
      status: 'new',
      priority: 'low',
      projectId: '2',
      assigneeId: '2',
      reporterId: '1',
      dueDate: '2024-02-15',
      estimatedHours: 8,
      actualHours: 0,
      tags: ['documentation', 'api'],
      createdAt: '2024-01-25T12:00:00Z',
      updatedAt: '2024-01-25T12:00:00Z',
    },
  ],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Partial<Task> & { id: string }>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  setLoading,
  setError,
} = tasksSlice.actions;

export default tasksSlice.reducer;