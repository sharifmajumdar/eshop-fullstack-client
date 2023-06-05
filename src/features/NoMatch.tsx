import { Container, Box, Typography } from '@mui/material'

const NoMatch = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box sx={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6">Nothing found: 404!!!</Typography>
      </Box>
    </Container>
  )
}

export default NoMatch