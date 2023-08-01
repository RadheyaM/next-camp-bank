import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import s from './TableFilterSort.module.css';
import { Button } from '@mui/material';

const TableFilterSort = () => {
  const [filter, setFilter] = React.useState({
    category: " ",
    day: " ", 
    amount: " ", 
  });

  const handleChange = (identifier, event) => {
    if (identifier === "category") {
      setFilter({...filter, category: event.target.value});
    } else if (identifier === "day") {
      setFilter({...filter, day: event.target.value});
    } else {
      setFilter({...filter, amount: event.target.value});
    }
    setCategory(event.target.value);
  };
  return(
    <div className={s.filterSortContainer}>
      <FormControl className={s.formControl} variant="standard">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-filter"
          value={filter.category}
          onChange={(event) => {handleChange("category", event)}}
          label="category"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"Deposit"}>Deposits</MenuItem>
          <MenuItem value={"Book"}>Book Sales</MenuItem>
          <MenuItem value={"Tuckshop"}>Tuckshop Sales</MenuItem>
          <MenuItem value={"Withdrawal"}>Withdrawals</MenuItem>
          <MenuItem value={"Adjustments"}>Adjustments</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={s.formControl} variant="standard">
        <InputLabel id="day-label">Day</InputLabel>
        <Select
          labelId="day-label"
          id="day-filter"
          value={filter.day}
          onChange={(event) => {handleChange("day", event)}}
          label="day"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"Monday"}>Monday</MenuItem>
          <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
          <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
          <MenuItem value={"Thursday"}>Thursday</MenuItem>
          <MenuItem value={"Friday"}>Friday</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={s.formControl} variant="standard">
        <InputLabel id="amount-label">Amount</InputLabel>
        <Select
          labelId="amount-label"
          id="amount-filter"
          value={filter.amount}
          onChange={(event) => {handleChange("amount", event)}}
          label="amount"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"0-5"}>€0 - 5</MenuItem>
          <MenuItem value={"5-10"}>€5 - 10</MenuItem>
          <MenuItem value={"10-20"}>€10 - 20</MenuItem>
          <MenuItem value={"20-50"}>€20 - 50</MenuItem>
          <MenuItem value={"50+"}>€50+</MenuItem>
        </Select>
      </FormControl>
      <Button color="error">Clear</Button>
    </div>
  )
}

export default TableFilterSort;