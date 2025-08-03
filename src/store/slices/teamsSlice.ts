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

export interface Invitation {
  id: string;
  email: string;
  invitedBy: string;
  invitedAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  role: 'admin' | 'manager' | 'member' | 'viewer';
  teamId?: string;
  message?: string;
  expiresAt: string;
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
  invitations: Invitation[];
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
  invitations: [
    {
      id: '1',
      email: 'john.doe@example.com',
      invitedBy: '1',
      invitedAt: '2024-01-20T10:00:00Z',
      status: 'accepted',
      role: 'member',
      teamId: '1',
      message: 'Welcome to our design team!',
      expiresAt: '2024-02-20T10:00:00Z',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      invitedBy: '2',
      invitedAt: '2024-01-22T14:30:00Z',
      status: 'pending',
      role: 'member',
      message: 'Join our development team and help us build amazing products!',
      expiresAt: '2024-02-22T14:30:00Z',
    },
    {
      id: '3',
      email: 'bob.wilson@example.com',
      invitedBy: '3',
      invitedAt: '2024-01-25T09:15:00Z',
      status: 'accepted',
      role: 'member',
      teamId: '3',
      message: 'Looking forward to having you on our marketing team!',
      expiresAt: '2024-02-25T09:15:00Z',
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
    sendInvitation: (state, action: PayloadAction<Omit<Invitation, 'id' | 'invitedAt' | 'expiresAt'>>) => {
      const newInvitation: Invitation = {
        ...action.payload,
        id: Date.now().toString(),
        invitedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      };
      state.invitations.push(newInvitation);
    },
    updateInvitation: (state, action: PayloadAction<Partial<Invitation> & { id: string }>) => {
      const index = state.invitations.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.invitations[index] = { ...state.invitations[index], ...action.payload };
      }
    },
    deleteInvitation: (state, action: PayloadAction<string>) => {
      state.invitations = state.invitations.filter(i => i.id !== action.payload);
    },
    acceptInvitation: (state, action: PayloadAction<{ invitationId: string; userData: Omit<User, 'id' | 'joinedAt'> }>) => {
      const invitation = state.invitations.find(i => i.id === action.payload.invitationId);
      if (invitation) {
        invitation.status = 'accepted';
        
        // Create new user from accepted invitation
        const newUser: User = {
          ...action.payload.userData,
          id: Date.now().toString(),
          joinedAt: new Date().toISOString(),
          role: invitation.role,
          teamId: invitation.teamId || '',
        };
        state.users.push(newUser);
      }
    },
    assignUserToTeam: (state, action: PayloadAction<{ userId: string; teamId: string }>) => {
      const user = state.users.find(u => u.id === action.payload.userId);
      if (user) {
        user.teamId = action.payload.teamId;
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
  addTeam,
  updateTeam,
  deleteTeam,
  addUser,
  updateUser,
  deleteUser,
  sendInvitation,
  updateInvitation,
  deleteInvitation,
  acceptInvitation,
  assignUserToTeam,
  setLoading,
  setError,
} = teamsSlice.actions;

export default teamsSlice.reducer;