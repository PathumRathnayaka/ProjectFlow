import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  teams: [
    {
      id: '1',
      name: 'Design Team',
      description: 'UI/UX designers and visual creators',
      color: '#EC4899',
      memberIds: ['1', '4'],
      leaderId: '1',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'Development Team',
      description: 'Full-stack developers and engineers',
      color: '#10B981',
      memberIds: ['2', '5'],
      leaderId: '2',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '3',
      name: 'Marketing Team',
      description: 'Digital marketing and content specialists',
      color: '#F59E0B',
      memberIds: ['3', '6'],
      leaderId: '3',
      createdAt: '2024-01-01T00:00:00Z',
    },
  ],
  users: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face',
      role: 'manager',
      teamId: '1',
      department: 'Design',
      isActive: true,
      joinedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=150&h=150&fit=crop&crop=face',
      role: 'manager',
      teamId: '2',
      department: 'Development',
      isActive: true,
      joinedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@company.com',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=150&h=150&fit=crop&crop=face',
      role: 'manager',
      teamId: '3',
      department: 'Marketing',
      isActive: true,
      joinedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '4',
      name: 'Alex Thompson',
      email: 'alex.thompson@company.com',
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?w=150&h=150&fit=crop&crop=face',
      role: 'member',
      teamId: '1',
      department: 'Design',
      isActive: true,
      joinedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: '5',
      name: 'David Kim',
      email: 'david.kim@company.com',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150&h=150&fit=crop&crop=face',
      role: 'member',
      teamId: '2',
      department: 'Development',
      isActive: true,
      joinedAt: '2024-01-10T00:00:00Z',
    },
    {
      id: '6',
      name: 'Lisa Zhang',
      email: 'lisa.zhang@company.com',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150&h=150&fit=crop&crop=face',
      role: 'member',
      teamId: '3',
      department: 'Marketing',
      isActive: true,
      joinedAt: '2024-01-12T00:00:00Z',
    },
  ],
  loading: false,
  error: null,
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<Omit<Team, 'id' | 'createdAt'>>) => {
      const newTeam: Team = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.teams.push(newTeam);
    },
    updateTeam: (state, action: PayloadAction<Partial<Team> & { id: string }>) => {
      const index = state.teams.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.teams[index] = { ...state.teams[index], ...action.payload };
      }
    },
    deleteTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter(t => t.id !== action.payload);
    },
    addUser: (state, action: PayloadAction<Omit<User, 'id' | 'joinedAt'>>) => {
      const newUser: User = {
        ...action.payload,
        id: Date.now().toString(),
        joinedAt: new Date().toISOString(),
      };
      state.users.push(newUser);
    },
    updateUser: (state, action: PayloadAction<Partial<User> & { id: string }>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
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
  addTeam,
  updateTeam,
  deleteTeam,
  addUser,
  updateUser,
  deleteUser,
  setLoading,
  setError,
} = teamsSlice.actions;

export default teamsSlice.reducer;