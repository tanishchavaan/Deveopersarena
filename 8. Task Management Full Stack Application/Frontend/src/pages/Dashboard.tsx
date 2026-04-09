import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Fab } from '@mui/material';
import { LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" color="transparent" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Task Manager
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        Welcome, {user?.name}
                    </Typography>
                    <IconButton color="inherit" onClick={logout} title="Logout">
                        <LogOut />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto', backgroundColor: 'background.default' }}>
                <TaskList />
            </Box>

            <Fab 
                color="primary" 
                aria-label="add" 
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
                onClick={() => setIsFormOpen(true)}
            >
                <Plus />
            </Fab>

            <TaskForm open={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </Box>
    );
};

export default Dashboard;
