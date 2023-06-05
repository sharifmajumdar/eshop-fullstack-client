import { Box, Container, Grid, Typography } from '@mui/material'
import { colorTokens } from "../../theme"

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "success.main",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        marginTop: "1rem"
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              &copy;{`${new Date().getFullYear()} Shariful Islam Majumdar || React | MUI | Redux Toolkit | Spring Boot | PostgreSQL`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
