import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, CreateTaskRequest } from '../types/task';
import { taskService } from '../services/taskService';
import { webSocketService } from '../services/websocket';
import { useAuth } from './AuthContext';

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: (status?: TaskStatus) => Promise<void>;
    createTask: (task: CreateTaskRequest) => Promise<void>;
    updateTaskStatus: (id: number, status: TaskStatus) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    const fetchTasks = useCallback(async (status?: TaskStatus) => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const data = await taskService.getTasks({ status });
            setTasks(data.content || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTasks();
            webSocketService.connect();
            
            const unsubscribe = webSocketService.subscribe((message) => {
                const { type, payload } = message;
                if (type === 'TASK_CREATED') {
                    setTasks(prev => {
                        if (!prev.find(t => t.id === payload.id)) {
                             return [...prev, payload];
                        }
                        return prev;
                    });
                } else if (type === 'TASK_UPDATED') {
                    setTasks(prev => prev.map(t => t.id === payload.id ? payload : t));
                } else if (type === 'TASK_DELETED') {
                    setTasks(prev => prev.filter(t => t.id !== payload.id));
                }
            });

            return () => {
                unsubscribe();
                webSocketService.disconnect();
            };
        }
    }, [isAuthenticated, fetchTasks]);

    const createTask = async (task: CreateTaskRequest) => {
        await taskService.createTask(task);
    };

    const updateTaskStatus = async (id: number, status: TaskStatus) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
        try {
            await taskService.updateTaskStatus(id, status);
        } catch (err) {
            fetchTasks();
            throw err;
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTaskStatus }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
