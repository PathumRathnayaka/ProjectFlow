import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from '../api/apiService';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'member' | 'viewer';
  teamId: string;
  department: string;
  isActive: boolean;
  joinedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
  memberIds: string[];
  leaderId: string;
  createdAt: string;
}

interface TeamsState {
  teams: Team[];
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  users: [],
  loading: false,
  error: null,
};

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
  const teams = await getAllTeams();
  return teams.map((team: any) => ({
    ...team,
    id: team._id,
  }));
});

export const addTeamAsync = createAsyncThunk('teams/addTeamAsync', async (data: Omit<Team, 'id' | 'createdAt'>) => {
  const newTeam = await createTeam(data);
  return { ...newTeam, id: newTeam._id };
});

export const updateTeamAsync = createAsyncThunk('teams/updateTeamAsync', async ({ id, data }: { id: string; data: Partial<Team> }) => {
  const updated = await updateTeam(id, data);
  return { ...updated, id: updated._id };
});

export const deleteTeamAsync = createAsyncThunk('teams/deleteTeamAsync', async (id: string) => {
  await deleteTeam(id);
  return id;
});

export const fetchUsers = createAsyncThunk('teams/fetchUsers', async () => {
  const members = await getAllMembers();
  return members.map((member: any) => ({
    ...member,
    id: member._id,
    joinedAt: member.joinedAt,
  }));
});

export const addUserAsync = createAsyncThunk('teams/addUserAsync', async (data: Omit<User, 'id' | 'joinedAt'>) => {
  const newUser = await createMember(data);
  return { ...newUser, id: newUser._id, joinedAt: newUser.joinedAt };
});

export const updateUserAsync = createAsyncThunk('teams/updateUserAsync', async ({ id, data }: { id: string; data: Partial<User> }) => {
  const updated = await updateMember(id, data);
  return { ...updated, id: updated._id };
});

export const deleteUserAsync = createAsyncThunk('teams/deleteUserAsync', async (id: string) => {
  await deleteMember(id);
  return id;
});

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Teams
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teams';
      })
      .addCase(addTeamAsync.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      })
      .addCase(updateTeamAsync.fulfilled, (state, action) => {
        const index = state.teams.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(deleteTeamAsync.fulfilled, (state, action) => {
        state.teams = state.teams.filter((t) => t.id !== action.payload);
      })
      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default teamsSlice.reducer;