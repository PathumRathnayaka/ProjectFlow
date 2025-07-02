import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'on-hold' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  dueDate: string;
  progress: number;
  teamId: string;
  ownerId: string;
  folderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFolder {
  id: string;
  name: string;
  color: string;
  projectIds: string[];
}

interface ProjectsState {
  projects: Project[];
  folders: ProjectFolder[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      status: 'active',
      priority: 'high',
      startDate: '2024-01-15',
      dueDate: '2024-03-15',
      progress: 65,
      teamId: '1',
      ownerId: '1',
      folderId: '1',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T15:30:00Z',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android',
      status: 'active',
      priority: 'urgent',
      startDate: '2024-01-20',
      dueDate: '2024-04-20',
      progress: 30,
      teamId: '2',
      ownerId: '2',
      folderId: '2',
      createdAt: '2024-01-20T09:00:00Z',
      updatedAt: '2024-01-25T11:15:00Z',
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      description: 'Q1 digital marketing campaign across all channels',
      status: 'on-hold',
      priority: 'medium',
      startDate: '2024-02-01',
      dueDate: '2024-03-31',
      progress: 15,
      teamId: '3',
      ownerId: '3',
      folderId: '1',
      createdAt: '2024-02-01T14:00:00Z',
      updatedAt: '2024-02-05T16:45:00Z',
    },
  ],
  folders: [
    {
      id: '1',
      name: 'Active Projects',
      color: '#3B82F6',
      projectIds: ['1', '3'],
    },
    {
      id: '2',
      name: 'Development',
      color: '#10B981',
      projectIds: ['2'],
    },
  ],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newProject: Project = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.projects.push(newProject);
    },
    updateProject: (state, action: PayloadAction<Partial<Project> & { id: string }>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    addFolder: (state, action: PayloadAction<Omit<ProjectFolder, 'id'>>) => {
      const newFolder: ProjectFolder = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.folders.push(newFolder);
    },
    updateFolder: (state, action: PayloadAction<Partial<ProjectFolder> & { id: string }>) => {
      const index = state.folders.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.folders[index] = { ...state.folders[index], ...action.payload };
      }
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(f => f.id !== action.payload);
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
  addProject,
  updateProject,
  deleteProject,
  addFolder,
  updateFolder,
  deleteFolder,
  setLoading,
  setError,
} = projectsSlice.actions;

export default projectsSlice.reducer;