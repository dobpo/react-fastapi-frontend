import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';

export default function Auth({ setAuth }) {
  const [error, setError] = useState(null);






  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    (async () => {
      let response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(Object.fromEntries(data))
      });

      if (response.ok) {
        let result = await response.json();
        setAuth({auth: true, isSuperuser: result.isSuperuser})
      } else {
        setError('Неверный логин или пароль');
      }
    })();
  };

  return (
    <div style={{
      height: '100vh',
      background: '-webkit-linear-gradient(bottom, rgba(212, 250, 222, .8), rgba(204, 204, 204, .4))',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container
        component='main'
        maxWidth='xs'
        margin='normal'
        style={{
          background: 'rgba(255, 255, 255, .1)',
          paddingTop: '15px',
          paddingBottom: '15px',
          borderRadius: '20px'
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Логин'
              name='name'
              autoComplete='name'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Пароль'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>

          </Box>
        </Box>
      </Container>
    </div>
  );
}
