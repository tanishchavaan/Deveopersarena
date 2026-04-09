import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTasks } from '../context/TaskContext';
import { TaskStatus, TaskPriority } from '../types/task';

interface TaskFormProps {
    open: boolean;
    onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose }) => {
    const { createTask } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createTask({
                title,
                description,
                status: TaskStatus.TODO,
                priority
            });
            setTitle('');
            setDescription('');
            setPriority(TaskPriority.MEDIUM);
            onClose();
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Title"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={priority}
                            label="Priority"
                            onChange={(e) => setPriority(e.target.value as TaskPriority)}
                        >
                            <MenuItem value={TaskPriority.LOW}>Low</MenuItem>
                            <MenuItem value={TaskPriority.MEDIUM}>Medium</MenuItem>
                            <MenuItem value={TaskPriority.HIGH}>High</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button type="submit" variant="contained">Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TaskForm;
