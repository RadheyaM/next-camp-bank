import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "./SearchByName.module.css";

const SearchByName = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("you submitted...", searchInput);
    props.onSearch(searchInput);
  };
  const inputChangeHandler = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };
  const clearHandler = () => {
    props.onClear();
    setSearchInput("");
  };
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom className={styles.title}>
        Filter By Name
      </Typography>
      <form onSubmit={submitHandler} className={styles.searchByName}>
        <Grid className={styles.searchInput}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Enter Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={inputChangeHandler}
            value={searchInput}
          />
        </Grid>
        <Grid>
          <Button className={styles.filter} type="submit" variant="contained">
            Search
          </Button>
          <Button onClick={clearHandler}>Clear</Button>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default SearchByName;
