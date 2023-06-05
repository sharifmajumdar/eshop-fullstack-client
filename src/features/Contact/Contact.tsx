import { Container, Box, Typography } from '@mui/material'

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box sx={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6">This is contact page</Typography>
      </Box>
    </Container>
  )
}

export default Contact
