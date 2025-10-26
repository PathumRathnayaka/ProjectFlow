import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/v1/projectflow';

const api = axios.create({
  baseURL: API_BASE,
});

// Member (User) API functions
export const getAllMembers = async () => (await api.get('/member')).data;
export const createMember = async (data: any) => (await api.post('/member', data)).data;
export const updateMember = async (id: string, data: any) => (await api.put(`/member/${id}`, data)).data;
export const deleteMember = async (id: string) => (await api.delete(`/member/${id}`)).data;

// Team API functions
export const getAllTeams = async () => (await api.get('/team')).data;
export const createTeam = async (data: any) => (await api.post('/team', data)).data;
export const updateTeam = async (id: string, data: any) => (await api.put(`/team/${id}`, data)).data;
export const deleteTeam = async (id: string) => (await api.delete(`/team/${id}`)).data;