import { createConfigAPI, getConfigAPI } from './configurationAPI';

const projectAPI = getConfigAPI('ProjectList');
const staffAPI = getConfigAPI('UserList');

export const fetchProjects = async () => {
  try {
    const response = await projectAPI.get('/');
    return response.data;
  } catch (error) {

    throw error;
  }
};

export const createProject = async (project) => {
  try {
    const response = await projectAPI.post('/', project);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id, project) => {
  try {
    const response = await projectAPI.put(`/${id}`, project);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await projectAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStaff = async () => {
  try {
    const response = await staffAPI.get('/');
    return response.data;
  } catch (error) {  throw error;
  }
};

export const createStaff = async (staff) => {
  try {
    const response = await staffAPI.post('/', staff);
    return response.data;
  } catch (error) {  throw error;
  }
};

export const updateStaff = async (id, staff) => {
  try {
    const response = await staffAPI.put(`/${id}`, staff);
    return response.data;
  } catch (error) {  throw error;
  }
};

export const deleteStaff = async (id) => {
  try {
    const response = await staffAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {  throw error;
  }
};