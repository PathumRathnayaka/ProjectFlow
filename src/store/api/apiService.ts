import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/projectflow';

// Teams
export const getAllTeams = async () => {
  const response = await axios.get(`${API_BASE_URL}/team`);
  return response.data;
};

export const createTeam = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/team`, data);
  return response.data;
};

export const updateTeam = async (id: string, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/team/${id}`, data);
  return response.data;
};

export const deleteTeam = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/team/${id}`);
};

// Members (Users)
export const getAllMembers = async () => {
  const response = await axios.get(`${API_BASE_URL}/member`);
  return response.data;
};

export const createMember = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/member`, data);
  return response.data;
};

export const updateMember = async (id: string, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/member/${id}`, data);
  return response.data;
};

export const deleteMember = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/member/${id}`);
};

// Projects (New additions)
export const getAllProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/project`);
  return response.data;
};

export const createProject = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/project`, data);
  return response.data;
};

export const updateProject = async (id: string, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/project/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/project/${id}`);
};