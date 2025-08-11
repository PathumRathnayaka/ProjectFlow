import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/projectflow';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const projectAPI = {
  getAllProjects: () => apiClient.get('/project'),
  getProject: (id: string) => apiClient.get(`/project/${id}`),
  createProject: (projectData: any) => apiClient.post('/project', projectData),
  updateProject: (id: string, projectData: any) => apiClient.put(`/project/${id}`, projectData),
  deleteProject: (id: string) => apiClient.delete(`/project/${id}`),
};

export const taskAPI = {
  getAllTasks: () => apiClient.get('/task'),
  getTask: (id: string) => apiClient.get(`/task/${id}`),
  createTask: (taskData: any) => apiClient.post('/task', taskData),
  updateTask: (id: string, taskData: any) => apiClient.put(`/task/${id}`, taskData),
  deleteTask: (id: string) => apiClient.delete(`/task/${id}`),
};

export const teamAPI = {
  getAllTeams: () => apiClient.get('/team'),
  getTeam: (id: string) => apiClient.get(`/team/${id}`),
  createTeam: (teamData: any) => apiClient.post('/team', teamData),
  updateTeam: (id: string, teamData: any) => apiClient.put(`/team/${id}`, teamData),
  deleteTeam: (id: string) => apiClient.delete(`/team/${id}`),
};

export const memberAPI = {
  getAllMembers: () => apiClient.get('/member'),
  getMember: (id: string) => apiClient.get(`/member/${id}`),
  createMember: (memberData: any) => apiClient.post('/member', memberData),
  updateMember: (id: string, memberData: any) => apiClient.put(`/member/${id}`, memberData),
  deleteMember: (id: string) => apiClient.delete(`/member/${id}`),
};