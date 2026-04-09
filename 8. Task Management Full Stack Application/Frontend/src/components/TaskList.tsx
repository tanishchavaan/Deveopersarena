import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, Chip } from '@mui/material';
import { TaskStatus, TaskPriority } from '../types/task';
import { useTasks } from '../context/TaskContext';

const priorityColors: Record<TaskPriority, "success" | "warning" | "error"> = {
    [TaskPriority.LOW]: 'success',
    [TaskPriority.MEDIUM]: 'warning',
    [TaskPriority.HIGH]: 'error'
};

const TaskList: React.FC = () => {
    const { tasks, updateTaskStatus } = useTasks();

    const getTasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status);

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData('text/plain', taskId);
    };

    const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
        e.preventDefault();
        const taskIdStr = e.dataTransfer.getData('text/plain');
        if (!taskIdStr) return;
        const taskId = parseInt(taskIdStr, 10);
        if (!isNaN(taskId)) {
            updateTaskStatus(taskId, status);
        }
    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <Grid container spacing={3} sx={{ height: '100%' }}>
            {Object.values(TaskStatus).map(status => (
                <Grid size={{ xs: 12, md: 4 }} key={status}>
                    <Paper 
                        sx={{ 
                            p: 2, 
                            height: '100%', 
                            minHeight: 500,
                            backgroundColor: 'background.paper',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        onDrop={(e) => handleDrop(e, status)}
                        onDragOver={allowDrop}
                    >
                        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                            {status.replace('_', ' ')}
                        </Typography>
                        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            {getTasksByStatus(status).map(task => (
                                <Card 
                                    key={task.id} 
                                    sx={{ 
                                        mb: 2, 
                                        cursor: 'grab',
                                        '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id.toString())}
                                >
                                    <CardContent>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {task.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, mt: 0.5 }}>
                                            {task.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                            <Chip 
                                                label={task.priority} 
                                                size="small" 
                                                color={priorityColors[task.priority]} 
                                                variant="outlined"
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                By: {task.createdBy?.name}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default TaskList;
