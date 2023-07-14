import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '../UI/Card';
import MyList from '../UI/List';

const SearchByName = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Search By Name
      </Typography>
      <Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Start typing name..."
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default SearchByName;