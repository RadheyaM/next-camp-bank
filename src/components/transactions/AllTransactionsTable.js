import Table from "../UI/Table";
import AllTransRows from "./AllTransRows";
import Card from "../UI/Card";
import sortBy from 'array-sort-by';
import Paper from '@mui/material/Paper';
import { CSVLink } from 'react-csv';
import { Box } from '@mui/material';

const AllTransactionsTable = (props) => {
  const { query } = props;
  const allTrans = query.data?.data?.data || [];
  const sortByDate = sortBy(allTrans, tran => -new Date(tran.timeStamp));

  // 1. Generate Safe Timestamp String (DD-MMM-YYYY_HH-mm-ss)
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

  const csvFilename = `All Transactions ${getTimestampString()}.csv`;

  // 2. Map all transaction details nicely for CSV layout
  const csvData = sortByDate.map((t) => ({
    "TRANSACTION ID": t._id,
    "ADDED BY": t.user || "",
    "ACCOUNT CODE": t.accountId || "",
    "NAME": t.name || "",
    "DATE & TIME": new Date(t.timeStamp).toLocaleString('en-GB'),
    "TYPE": t.type || "",
    "CATEGORY": t.category || "",
    "AMOUNT (€)": Number(t.amount) || 0,
    "NOTE": t.note || ""
  }));

  return (
    <Paper elevation={6} sx={{ width: "95%", display: "flex", flexDirection: "column", padding: "5rem", backgroundColor: "#f8f8ff" }}>
      <Card>
        
        {/* Centered Heading and Download Button */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4, width: "100%" }}>
          <h1 style={{ margin: 0, textAlign: "center" }}>Recent Transactions</h1>
          <CSVLink 
            data={csvData}
            filename={csvFilename}
            style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold", fontSize: "1rem", marginTop: "0.5rem" }}
          >
            📥 Download All Transactions CSV
          </CSVLink>
        </Box>

        <Table style={{ width: "100%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Added By</th>
              <th>Account Code</th>
              <th>Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {sortByDate.map((trans) => (
              <AllTransRows key={trans._id} trans={trans} />
            ))}
          </tbody>
        </Table>
      </Card>
    </Paper>
  );
};

export default AllTransactionsTable;
