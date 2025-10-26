import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllProjects, createProject, updateProject, deleteProject } from '../api/apiService';

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
  projects: [],
  folders: [
    {
      id: '1',
      name: 'Active Projects',
      color: '#3B82F6',
      projectIds: [],
    },
    {
      id: '2',
      name: 'Development',
      color: '#10B981',
      projectIds: [],
    },
  ],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const projects = await getAllProjects();
  return projects.map((project: any) => ({
    ...project,
    id: project._id,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }));
});

export const addProjectAsync = createAsyncThunk('projects/addProjectAsync', async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newProject = await createProject(data);
  return { ...newProject, id: newProject._id, createdAt: newProject.createdAt, updatedAt: newProject.updatedAt };
});

export const updateProjectAsync = createAsyncThunk('projects/updateProjectAsync', async ({ id, data }: { id: string; data: Partial<Project> }) => {
  const updated = await updateProject(id, data);
  return { ...updated, id: updated._id, createdAt: updated.createdAt, updatedAt: updated.updatedAt };
});

export const deleteProjectAsync = createAsyncThunk('projects/deleteProjectAsync', async (id: string) => {
  await deleteProject(id);
  return id;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const index = state.projects.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      });
  },
});

export const {
  addFolder,
  updateFolder,
  deleteFolder,
} = projectsSlice.actions;

export default projectsSlice.reducer;