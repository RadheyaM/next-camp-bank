import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import s from './TableFilterSort.module.css';

const TableFilterSort = () => {
  const [category, setCategory] = React.useState('');
  const [day, setDay] = React.useState('');

  const handleChange = (identifier, event) => {
    //add identifiers and if statements...
    setCategory(event.target.value);
  };
  return(
    <div className={s.filterContainer}>
      <FormControl className={s.formControl} variant="standard">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-filter"
          value={category}
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
      <FormControl className={s.formControl}>
        <InputLabel id="day-label">Day</InputLabel>
        <Select
          labelId="day-label"
          id="day-filter"
          value={day}
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
    </div>
  )
}

export default TableFilterSort;