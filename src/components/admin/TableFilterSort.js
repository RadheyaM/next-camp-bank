import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import s from "./TableFilterSort.module.css";
import { Button } from "@mui/material";
import AdminTransTable from "./AdminTransTable";
import { filterFn, getDateRange, filterDates } from "../../../lib/helpers";
import sortBy from 'array-sort-by';

const TableFilterSort = ({ trans, fifty }) => {
  const dateRange = Array.from(getDateRange(trans));
  const [filteredData, setFilteredData] = React.useState(trans);
  const [showData, setShowData] = React.useState(false);
  const [sort, setSort] = React.useState({
    name: "",
    date: "",
    amount: "",
  });
  const [filter, setFilter] = React.useState({
    addedby: "",
    category: "",
    date: "",
    note: "",
  });
  console.log("filter.addedby: ", filter.addedby === true);
  const handleFilterChange = (identifier, event) => {
    if (identifier === "category") {
      setFilter({ ...filter, category: event.target.value });
      setFilteredData(filterFn(filteredData, "category", event.target.value));
      setShowData(true);
    } else if (identifier === "date") {
      setFilter({ ...filter, date: event.target.value });
      setFilteredData(filterDates(filteredData, event.target.value));
      setShowData(true);
    } else if (identifier === "addedby") {
      setFilter({ ...filter, addedby: event.target.value });
      setFilteredData(filterFn(filteredData, "user", event.target.value));
      setShowData(true);
    } else {
      setFilter({ ...filter, note: event.target.value });
      setFilteredData(filterFn(filteredData, "note", event.target.value));
      setShowData(true);
    }
  };
  const handleSortChange = (identifier, event) => {
    if (identifier === "name") {
      if (event.target.value === "A-Z") {
        setFilteredData(sortBy(filteredData, data => data.name))
      } else {
        setFilteredData(sortBy(filteredData, data => -data.name))
      }
      setSort({
        name: event.target.value,
        date: "",
        amount: "",
      });
    } else if (identifier === "date") {
      if (event.target.value === "Old-New") {
        setFilteredData(sortBy(filteredData, data => new Date(data.timeStamp)))
      } else {
        setFilteredData(sortBy(filteredData, data => -new Date(data.timeStamp)))
      }
      setSort({
        name: "",
        date: event.target.value,
        amount: "",
      });
    } else {
      if (event.target.value === "Most-Least") {
        setFilteredData(sortBy(filteredData, data => -new Number(data.amount)))
      } else {
        setFilteredData(sortBy(filteredData, data => new Number(data.amount)))
      }
      setSort({
        name: "",
        date: "",
        amount: event.target.value,
      });
    }
  };
  const handleClear = () => {
    setFilter({
      addedby: "",
      category: "",
      date: "",
      note: "",
    });
    setSort({
      name: "",
      date: "",
      amount: "",
    });
    setFilteredData(trans);
    setShowData(false);
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
            <MenuItem value={""}>All</MenuItem>
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
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value="Deposit">Deposits</MenuItem>
            <MenuItem value="Book">Book Sales</MenuItem>
            <MenuItem value="Tuckshop">Tuckshop Sales</MenuItem>
            <MenuItem value="Withdrawal">Withdrawals</MenuItem>
            <MenuItem value="Adjustment">Adjustments</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="date-label">Date</InputLabel>
          <Select
            format="DD-MM-YYYY"
            labelId="date-label"
            id="date-filter"
            value={filter.date}
            onChange={(event) => {
              handleFilterChange("date", event);
            }}
            label="date"
          >
            <MenuItem value={""}>All</MenuItem>
            {dateRange &&
              dateRange.map((date) => {
                return (
                  <MenuItem id={date} value={date}>
                    {date}
                  </MenuItem>
                );
              })}
            {!dateRange && <MenuItem value="">No Transactions</MenuItem>}
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
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={true}>With Notes</MenuItem>
            <MenuItem value={false}>Without Notes</MenuItem>
          </Select>
        </FormControl>
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
            <MenuItem value={"A-Z"}>A-Z</MenuItem>
            <MenuItem value={"Z-A"}>Z-A</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={s.formControl} variant="standard">
          <InputLabel id="dateSort-label">Date/Time</InputLabel>
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
      </div>
      <div className={s.sortContainer}>
        <Button onClick={handleClear} color="error">
          Clear
        </Button>
      </div>
      {showData && (
        <div id="showall" className={s.tableContainer}>
          <AdminTransTable trans={filteredData} />
        </div>
      )}
      {!showData && (
        <div id="showNone" className={s.tableContainer}>
          <AdminTransTable />
        </div>
      )}
    </div>
  );
};

export default TableFilterSort;
