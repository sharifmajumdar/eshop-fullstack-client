/* import { 
  Container, 
  Box, 
  Typography, 
  Grid,
  TextField,
  Button   
} from '@mui/material'
import { makeStyles } from '@mui/system';

const useStyles = makeStyles((theme:any) => ({
  root: {
    padding: theme.spacing(4),
  },
  form: {
    maxWidth: 600,
    margin: '0 auto',
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));

interface CheckoutPageProps {
  onSubmit: () => void;
}


const Checkout = ({ onSubmit }: CheckoutPageProps) => { 
  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box sx={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6">This is Checkout page</Typography>
        <Box className={classes.root}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box component="h1" textAlign="center" mb={4}>
                Checkout
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.form}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Name"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        fullWidth
                        required
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Payment Information"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        fullWidth
                        type="submit"
                      >
                        Confirm Order
                      </Button>
                      <Button
                        variant="text"
                        color="primary"
                        className={classes.button}
                        fullWidth
                      >
                        Back to Cart
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Checkout */
import React from 'react';

const Checkout = () => {
  return (
    <div>
      <h1>This is checkout page</h1>
    </div>
  );
};

export default Checkout;