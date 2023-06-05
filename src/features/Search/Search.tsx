import { Container, InputAdornment, TextField, Box, FormControl } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useEffect, useState } from 'react';

const Search = (props: any) => {
  const [searchText, setSearchText] = useState('');    

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
  }

  //to recieve the value simultaneously
  useEffect( () => {
    props.onSearch(searchText);
  }, [searchText]);

  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
      <Box sx={{ margin: 0, display: "flex", justifyContent: "center" }}>
        <FormControl>
          <TextField
            id="search"
            type="search"
            label="Search"
            value={ searchText }
            onChange={handleChange}
            sx={{ width: 600 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />          
        </FormControl>
      </Box>
    </Container>
  )
}

export default Search;
