import { useState } from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import { handleGoogleSignIn, initializeLoginFramewrok } from './loginManagers'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { getUserEmail } from './loginSlice'
import { Container, Box, Typography, Button, TextField, FormControl, FormControlLabel, Checkbox } from '@mui/material'

const Login = () => {
  const [user, setUser] = useState({
    isSignIn: 'false',
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  const dispatch = useAppDispatch()

  initializeLoginFramewrok()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true)
    })
  }

  const handleResponse = (res: any, redirect: boolean) => {
    //setUser(res);
    dispatch(getUserEmail(res))
    redirect && navigate(from, { replace: true })
  }


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
      <Box sx={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ border: 1, borderRadius: 1, width: 400, display: 'flex', justifyContent: 'center' }}>
          <FormControl onSubmit={handleSubmit}>
            <Typography variant="h6">Login to eSHOP</Typography><br />
            <Box>
              <TextField 
                size="small" 
                id="email" 
                label="Email" 
                variant="outlined"
                value={email}
                onChange={event => setEmail(event.target.value)} 
                sx={{ width: 300 }}
                required 
              /><br /><br />
              <TextField 
                size="small" 
                id="outlined-basic" 
                label="Password" 
                type='password'
                variant="outlined" 
                value={password}
                onChange={event => setPassword(event.target.value)}
                sx={{ width: 300 }}
                required 
              /><br /><br />
              <Box sx={{ display: 'flex'}}>
                <FormControlLabel control={<Checkbox />} label="Remember me | " />
                <Link to="/forgotpassword"><Typography sx={{ paddingTop: 1}}>Lost Password</Typography></Link>
              </Box>
              <Box sx={{ display: 'flex'}}>
                <Button type="submit" variant="contained" sx={{ color: 'white', bgcolor: 'gray' }}>Login</Button>
                <Button> OR </Button>
                <Button variant="outlined" onClick={googleSignIn}>
                  <GoogleIcon /> 
                </Button>
                <Button variant="outlined" onClick={googleSignIn}>
                  <FacebookIcon />
                </Button>
              </Box>
            </Box> <br />
            <Box sx={{ display: 'flex', marginLeft: 1.5}}>
              <FormControlLabel control={<Typography />} label="Not registered? |" />
              <Link to="/signup"><Typography>Create account</Typography></Link>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
