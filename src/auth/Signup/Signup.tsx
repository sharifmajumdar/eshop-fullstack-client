import { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
} from '@mui/material'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault();
    }
  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
      <Box sx={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            width: 400,
            display: 'flex',
            justifyContent: 'center'
          }}>
          <FormControl onSubmit={handleSubmit}>
            <Typography variant="h6">Sign up in eSHOP</Typography>
            <br />
            <Box>
                <TextField
                size="small"
                id="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                sx={{ width: 300 }}
              />
              <br />
              <br />
              <TextField
                size="small"
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={{ width: 300 }}
                required
              />
              <br />
              <br />
              <TextField
                size="small"
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={{ width: 300 }}
                required
              />
              <br />
              <br />
              <Box sx={{ display: 'flex' }}>
                <Button type="submit" variant="contained" sx={{ color: 'white', bgcolor: 'gray' }}>
                  Signup
                </Button>
              </Box><br />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup
