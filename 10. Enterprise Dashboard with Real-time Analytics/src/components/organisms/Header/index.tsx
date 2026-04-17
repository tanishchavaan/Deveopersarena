import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Menu, MenuItem, ListItemText } from '@mui/material';
import { Notifications as NotificationsIcon, Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { markAsRead } from '@/features/notifications/slices/notificationSlice';
import { logout } from '@/features/auth/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notifications = useAppSelector((state) => state.notifications.messages);
  const unreadCount = useAppSelector((state) => state.notifications.unreadCount);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleMarkRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#6366f1' }}>
          Enterprise Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={handleOpenNotifications}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout} title="Logout">
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}
        PaperProps={{ sx: { background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', width: 320, mt: 1.5 } }}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>No notifications</MenuItem>
        ) : (
          notifications.map(n => (
            <MenuItem key={n.id} onClick={() => handleMarkRead(n.id)} sx={{ opacity: n.read ? 0.6 : 1, py: 1.5 }}>
              <ListItemText 
                primary={n.message} 
                secondary={new Date(n.timestamp).toLocaleTimeString()} 
                primaryTypographyProps={{ color: n.read ? 'textSecondary' : 'textPrimary', fontWeight: n.read ? 400 : 700 }}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </AppBar>
  );
};
