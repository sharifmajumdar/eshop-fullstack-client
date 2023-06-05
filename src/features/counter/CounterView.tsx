import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Typography } from '@mui/material'

import { decrement, increment } from '../../features/counter/counterSlice'
import { RootState } from '../../store'

const CounterView = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={5}>
        <Button variant="contained" onClick={() => dispatch(increment())}>
          Increment
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Typography>{count}</Typography>
      </Grid>
      <Grid item xs={5}>
        <Button variant="contained" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </Grid>
    </Grid>
  )
}

export default CounterView
