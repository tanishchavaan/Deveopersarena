import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import { loginSuccess } from '@/features/auth/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validate: (formValues) => {
      const errs: Record<string, string> = {};
      if (!formValues.email) errs.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formValues.email)) errs.email = 'Invalid email format';
      if (!formValues.password) errs.password = 'Password is required';
      return errs;
    },
    onSubmit: (formValues) => {
      dispatch(loginSuccess({ user: { email: formValues.email, name: 'Admin User' }, token: 'mock-jwt-token' }));
      navigate('/');
    }
  });

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'background.default' }}>
      <Card className="glassmorphism" sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }} color="primary">Login</Typography>
          <Typography color="textSecondary" sx={{ mb: 4 }}>Access the full functional platform using specific hooks.</Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth label="Email Address" variant="outlined" margin="normal"
              name="email" value={values.email} onChange={handleChange} 
              error={!!errors.email} helperText={errors.email}
            />
            <TextField 
              fullWidth label="Password" type="password" variant="outlined" margin="normal"
              name="password" value={values.password} onChange={handleChange}
              error={!!errors.password} helperText={errors.password}
            />
            <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 4, py: 1.5, background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)' }}>
              Sign In to Environment
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
