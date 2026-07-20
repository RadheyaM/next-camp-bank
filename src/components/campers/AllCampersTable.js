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
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    // 1. Filter by the active category tab (skip if "All" is selected)
    if (selectedCategory !== "All" && camper.category !== selectedCategory) return false;

    // 2. Filter by search query if text has been typed
    if (!searchTerm) return true;
    
    const name = (camper.firstName || camper.lastName)
      ? `${camper.firstName || ""} ${camper.lastName || ""}`.trim()
      : "Unassigned Account";
    const accountId = (camper.accountId || "").toString();

    return name.toLowerCase().includes(searchTerm) || accountId.toLowerCase().includes(searchTerm);
  });

  const downloadData = csvData.data?.data?.data || [];

  const getTimestampString = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const day = pad(d.getDate());
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    const hr = pad(d.getHours());
    const min = pad(d.getMinutes());
    const sec = pad(d.getSeconds());
    
    return `${day}-${month}-${year}_${hr}-${min}-${sec}`;
  };

  const csvFilename = `All Camper Balances ${getTimestampString()}.csv`;

  return (
    <Fragment>
      {/* 1-3. Centered Search Form (Filter By Name Title, input box, buttons) */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mb: 2 }}>
        <SearchByName onSearch={searchFilterHandler} onClear={clearFilterHandler}/>
      </Box>

      {/* 4. Centered CSV Download link */}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mb: 4 }}>
        <CSVLink 
          data={downloadData}
          filename={csvFilename}
          style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold", fontSize: "0.9rem" }}
        >
          📥 Download All Balances
        </CSVLink>
      </Box>

      {/* 5-6. Centered Title and Category Selector Tab Bar (Matches Table Width) */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mb: 3 }}>
        <h2 style={{ margin: "0 0 1rem 0", textAlign: "center" }}>All Accounts ({selectedCategory})</h2>
        
        <Box sx={{ width: "100%", maxWidth: "550px", borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedCategory}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
            aria-label="Account category tabs"
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              minHeight: "36px",
              "& .MuiTab-root": {
                py: 0.5,
                fontSize: "0.82rem", // slightly smaller font to fit 4 options beautifully
                fontWeight: "bold",
                minHeight: "36px",
                px: 1
              }
            }}
          >
            <Tab value="Primary" label="Primary" />
            <Tab value="Secondary" label="Secondary" />
            <Tab value="Unassigned" label="Unassigned" />
            <Tab value="All" label="All" />
          </Tabs>
        </Box>
      </Box>

      {/* 7. The Table centered with 550px max width alignment */}
      <Table className={styles.transTable} style={{ margin: "0 auto", width: "100%", maxWidth: "550px" }}>
        <thead>
          <tr>
            <th>Account Id</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {[...displayedCampers]
            .sort((a, b) => Number(a.accountId || 0) - Number(b.accountId || 0))
            .map((camper) => (
              <CamperRow key={camper._id} camper={camper}/>
            ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default AllCampersTable;
