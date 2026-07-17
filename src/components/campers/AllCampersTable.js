import CamperRow from "./CamperRow";
import Table from "../UI/Table";
import { Fragment, useState } from "react";
import SearchByName from "@/components/forms/SearchByName";
import styles from './AllCampersTable.module.css';
import { CSVLink } from 'react-csv';
import { Tabs, Tab, Box } from "@mui/material";

const AllCampersTable = (props) => {
  const { campers, query, csvData } = props;
  
  // React states for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Primary");

  const searchFilterHandler = (filterName) => {
    setSearchTerm(filterName.toLowerCase().trim());
  };

  const clearFilterHandler = () => {
    setSearchTerm("");
  };

  // Get raw data safely from React Query or static props
  const allData = query.data?.data?.data || campers || [];

  // Filter accounts dynamically based on active Tab and active search text query
  const displayedCampers = allData.filter((camper) => {
    // 1. Filter by the active category tab
    if (camper.category !== selectedCategory) return false;

    // 2. Filter by search query if text has been typed
    if (!searchTerm) return true;
    
    const name = (camper.firstName || camper.lastName)
      ? `${camper.firstName || ""} ${camper.lastName || ""}`.trim()
      : "Unassigned Account";
    const accountId = (camper.accountId || "").toString();

    return name.toLowerCase().includes(searchTerm) || accountId.toLowerCase().includes(searchTerm);
  });

  const downloadData = csvData.data?.data?.data || [];

  return (
    <Fragment>
      {/* Category Selection Tab Bar */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={(event, newValue) => setSelectedCategory(newValue)}
          aria-label="Account category tabs"
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab value="Primary" label="Primary Accounts" sx={{ fontWeight: "bold" }} />
          <Tab value="Secondary" label="Secondary Accounts" sx={{ fontWeight: "bold" }} />
          <Tab value="Unassigned" label="Unassigned Accounts" sx={{ fontWeight: "bold" }} />
        </Tabs>
      </Box>

      <SearchByName onSearch={searchFilterHandler} onClear={clearFilterHandler}/>
      
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <CSVLink 
          data={downloadData}
          filename={"all-camper-balances.csv"}
          style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}
        >
          📥 Download All Balances
        </CSVLink>
      </div>

      <Table className={styles.transTable}>
        <caption>
          <h2>All Accounts ({selectedCategory})</h2>
        </caption>
        <thead>
          <tr>
            <th>Account Id</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {displayedCampers.map((camper) => (
            <CamperRow key={camper._id} camper={camper}/>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default AllCampersTable;
