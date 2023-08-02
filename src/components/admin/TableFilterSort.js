import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import s from "./TableFilterSort.module.css";
import { Button } from "@mui/material";
import AdminTransTable from "./AdminTransTable";
import { filterFn } from "../../../lib/helpers";

const TableFilterSort = ({ trans }) => {
  console.log("trans: ", trans);
  const [filteredData, setFilteredData] = React.useState(trans);
  const [sort, setSort] = React.useState({
    name: "",
    date: "",
    amount: "",
  });
  const [filter, setFilter] = React.useState({
    addedby: "",
    category: "",
    day: "",
    amount: "",
    note: "",
  });
  const handleFilterChange = (identifier, event) => {
    if (identifier === "category") {
      setFilter({ ...filter, category: event.target.value });
      setFilteredData(filterFn(filteredData, 'category', event.target.value))
    } else if (identifier === "day") {
      setFilter({ ...filter, day: event.target.value });
    } else if (identifier === "amount") {
      setFilter({ ...filter, amount: event.target.value });
    } else if (identifier === "addedby") {
      setFilter({ ...filter, addedby: event.target.value });
      setFilteredData(filterFn(filteredData, 'user', event.target.value))
    } else {
      setFilter({ ...filter, note: event.target.value });
    }
  };
  const handleSortChange = (identifier, event) => {
    if (identifier === "name") {
      setSort({
        name: event.target.value,
        date: "",
        amount: "",
      });
    } else if (identifier === "date") {
      setSort({
        name: "",
        date: event.target.value,
        amount: "",
      });
    } else {
      setSort({
        name: "",
        date: "",
        amount: event.target.value,
      });
    }
  };
  const handleClearFilters = () => {
    setFilter({
      addedby: "",
      category: "",
      day: "",
      amount: "",
      note: "",
    });
    setFilteredData(trans);
  };
  const handleClearSort = () => {
    setSort({
      name: "",
      date: "",
      amount: "",
    });
  };

  return (
    <div className={s.filterSortContainer}>
      <div className={s.filterContainer}>
        <h2>Filter(s): </h2>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="addedby-label">Added By</InputLabel>
          <Select
            labelId="addedby-label"
            id="addedby-filter"
            value={filter.addedby}
            onChange={(event) => {
              handleFilterChange("addedby", event);
            }}
            label="Added By"
          >
            <MenuItem value={"Staff"}>Staff</MenuItem>
            <MenuItem value={"Dylan"}>Dylan</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-filter"
            value={filter.category}
            onChange={(event) => {
              handleFilterChange("category", event);
            }}
            label="category"
          >
            <MenuItem value={"Deposit"}>Deposits</MenuItem>
            <MenuItem value={"Book"}>Book Sales</MenuItem>
            <MenuItem value={"Tuckshop"}>Tuckshop Sales</MenuItem>
            <MenuItem value={"Withdrawal"}>Withdrawals</MenuItem>
            <MenuItem value={"Adjustment"}>Adjustments</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="day-label">Day</InputLabel>
          <Select
            labelId="day-label"
            id="day-filter"
            value={filter.day}
            onChange={(event) => {
              handleFilterChange("day", event);
            }}
            label="day"
          >
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
            onChange={(event) => {
              handleFilterChange("amount", event);
            }}
            label="amount"
          >
            <MenuItem value={"0-5"}>€0 - 5</MenuItem>
            <MenuItem value={"5-10"}>€5 - 10</MenuItem>
            <MenuItem value={"10-20"}>€10 - 20</MenuItem>
            <MenuItem value={"20-50"}>€20 - 50</MenuItem>
            <MenuItem value={"50+"}>€50+</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="note-label">Notes</InputLabel>
          <Select
            labelId="note-label"
            id="note-filter"
            value={filter.note}
            onChange={(event) => {
              handleFilterChange("note", event);
            }}
            label="note"
          >
            <MenuItem value={true}>With Notes</MenuItem>
            <MenuItem value={false}>Without Notes</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleClearFilters} color="error">
          Clear Filters
        </Button>
      </div>
      <div className={s.sortContainer}>
        <h2>Sort:</h2>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="nameSort-label">Name</InputLabel>
          <Select
            labelId="nameSort-label"
            id="nameSort"
            value={sort.name}
            onChange={(event) => {
              handleSortChange("name", event);
            }}
            label="Name"
          >
            <MenuItem value={"First A-Z"}>First A-Z</MenuItem>
            <MenuItem value={"First Z-A"}>First Z-A</MenuItem>
            <MenuItem value={"Last A-Z"}>Last A-Z</MenuItem>
            <MenuItem value={"Last Z-A"}>Last A-Z</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="dateSort-label">Date</InputLabel>
          <Select
            labelId="dateSort-label"
            id="dateSort"
            value={sort.date}
            onChange={(event) => {
              handleSortChange("date", event);
            }}
            label="Date"
          >
            <MenuItem value={"Old-New"}>Old-New</MenuItem>
            <MenuItem value={"New-Old"}>New-Old</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="amountSort-label">Amount</InputLabel>
          <Select
            labelId="amountSort-label"
            id="amountSort"
            value={sort.amount}
            onChange={(event) => {
              handleSortChange("amount", event);
            }}
            label="Amount"
            inputProps={{ "aria-label": "Sort by Amount" }}
          >
            <MenuItem value={"Most-Least"}>Most-Least</MenuItem>
            <MenuItem value={"Least-Most"}>Least-Most</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleClearSort} color="error">
          Clear Sort
        </Button>
      </div>
      <div className={s.tableContainer}>
        <AdminTransTable trans={filteredData} />
      </div>
    </div>
  );
};

export default TableFilterSort;
