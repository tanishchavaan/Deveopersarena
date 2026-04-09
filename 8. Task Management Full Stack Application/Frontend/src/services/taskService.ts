import { axiosInstance } from './api';
import { CreateTaskRequest, UpdateTaskRequest, TaskStatus, TaskPriority } from '../types/task';

export const taskService = {
    async getTasks(params?: { status?: TaskStatus; priority?: TaskPriority; assigneeId?: number; page?: number; size?: number }) {
        const response = await axiosInstance.get('/tasks', { params });
        return response.data;
    },

    async getTask(id: number) {
        const response = await axiosInstance.get(`/tasks/${id}`);
        return response.data;
    },

    async createTask(task: CreateTaskRequest) {
        const response = await axiosInstance.post('/tasks', task);
        return response.data;
    },

    async updateTask(id: number, task: UpdateTaskRequest) {
        const response = await axiosInstance.put(`/tasks/${id}`, task);
        return response.data;
    },

    async updateTaskStatus(id: number, status: TaskStatus) {
        const response = await axiosInstance.put(`/tasks/${id}/status`, { status });
        return response.data;
    },

    async deleteTask(id: number) {
        await axiosInstance.delete(`/tasks/${id}`);
    }
};
