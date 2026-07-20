import Card from "../UI/Card";
import styles from "./SummaryComponent.module.css"
import Table from "../UI/Table";
import { euro } from "../../../lib/helpers";
import Paper from '@mui/material/Paper';
import { CSVLink } from 'react-csv';
import { Box } from '@mui/material';

const SummaryComponent = (props) => {
  const { query } = props;
  const allData = query.data?.data?.data || props.data || [];

  // 1. Helper function to get local date key YYYY-MM-DD
  const getDateKey = (timeStamp) => {
    const d = new Date(timeStamp);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 2. Helper function to format date as "Monday 7th Oct"
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Unknown Date";

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[d.getDay()];

    const dayNum = d.getDate();
    let suffix = "th";
    if (dayNum === 1 || dayNum === 21 || dayNum === 31) suffix = "st";
    else if (dayNum === 2 || dayNum === 22) suffix = "nd";
    else if (dayNum === 3 || dayNum === 23) suffix = "rd";

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[d.getMonth()];

    return `${dayName} ${dayNum}${suffix} ${monthName}`;
  };

  // 3. Overall bank aggregates
  let depCurrent = 0;
  let tuckCurrent = 0;
  let iceCurrent = 0;
  let popCurrent = 0;
  let candyCurrent = 0;
  let bookCurrent = 0;
  let outCurrent = 0;
  let adjCurrent = 0;

  // Grouped transaction data by date
  const dailyGroups = {};

  allData.forEach((tran) => {
    const amount = Number(tran.amount) || 0;
    const cat = tran.category;

    // Track overall aggregates
    if (cat === "Deposit") depCurrent += amount;
    else if (cat === "Tuckshop") tuckCurrent += amount;
    else if (cat === "Icecream") iceCurrent += amount;
    else if (cat === "Popcorn") popCurrent += amount;
    else if (cat === "Candyfloss") candyCurrent += amount;
    else if (cat === "Book") bookCurrent += amount;
    else if (cat === "Withdrawal") outCurrent += amount;
    else if (cat === "Adjustment") adjCurrent += amount;

    // Group transactions dynamically by date
    const dateKey = getDateKey(tran.timeStamp);
    if (!dailyGroups[dateKey]) {
      dailyGroups[dateKey] = {
        dateKey,
        dep: 0,
        tuck: 0,
        ice: 0,
        pop: 0,
        candy: 0,
        book: 0,
        out: 0,
        adj: 0
      };
    }

    if (cat === "Deposit") dailyGroups[dateKey].dep += amount;
    else if (cat === "Tuckshop") dailyGroups[dateKey].tuck += amount;
    else if (cat === "Icecream") dailyGroups[dateKey].ice += amount;
    else if (cat === "Popcorn") dailyGroups[dateKey].pop += amount;
    else if (cat === "Candyfloss") dailyGroups[dateKey].candy += amount;
    else if (cat === "Book") dailyGroups[dateKey].book += amount;
    else if (cat === "Withdrawal") dailyGroups[dateKey].out += amount;
    else if (cat === "Adjustment") dailyGroups[dateKey].adj += amount;
  });

  const bankBalance = depCurrent - tuckCurrent - bookCurrent - popCurrent - candyCurrent - iceCurrent - outCurrent - adjCurrent;

  // 4. Calculate Running Cumulative Balance
  // Sort keys chronologically (oldest to newest)
  const sortedDateKeys = Object.keys(dailyGroups).sort();
  
  let runningBalance = 0;
  const processedDailyTotals = sortedDateKeys.map((dateKey) => {
    const g = dailyGroups[dateKey];
    // Calculate net change for this day
    const netChange = g.dep - g.tuck - g.ice - g.pop - g.candy - g.book - g.out - g.adj;
    runningBalance += netChange;

    return {
      dateText: formatDate(dateKey),
      runningBalance,
      dep: g.dep,
      tuck: g.tuck,
      ice: g.ice,
      popCandy: g.pop + g.candy, // Combine Popcorn and Candyfloss under Popcorn/Candy Floss
      book: g.book,
      out: g.out,
      adj: g.adj
    };
  });

  // 5. Generate Safe Timestamp String (DD-MMM-YYYY_HH-mm-ss)
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

  const currentTimestamp = getTimestampString();
  const currentFilename = `Current Balance ${currentTimestamp}.csv`;

  // Map Bank Current Totals CSV row
  const currentTotalsCSVData = [
    {
      "BANK BALANCE": bankBalance,
      "DEPOSITS": depCurrent,
      "TUCKSHOP": -tuckCurrent,
      "ICE CREAM": -iceCurrent,
      "POPCORN/CANDY FLOSS": -(popCurrent + candyCurrent),
      "BOOKS": -bookCurrent,
      "WITHDRAWALS": -outCurrent,
      "ADJUSTMENTS": -adjCurrent
    }
  ];

  return (
    <Paper elevation={6} sx={{ width: "95%", height: "100%", display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", backgroundColor: "#f8f8ff" }}>
      <Card>
        {/* BANK CURRENT TOTALS Card centered */}
        <Card sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <h2 style={{ margin: 0, textAlign: "center" }}>BANK CURRENT TOTALS</h2>
            <CSVLink 
              data={currentTotalsCSVData}
              filename={currentFilename}
              style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold", fontSize: "0.9rem", marginTop: "0.5rem" }}
            >
              📥 Download Current Balance CSV
            </CSVLink>
          </Box>
          
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table style={{ width: "100%", minWidth: "1100px", maxWidth: "1150px", margin: "0 auto", borderCollapse: "collapse", textAlign: "center" }}>
              <thead>
                <tr>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>BANK BALANCE</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>DEPOSITS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>TUCKSHOP</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>ICE CREAM</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>POPCORN/CANDY FLOSS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>BOOKS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>WITHDRAWALS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>ADJUSTMENTS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.totalsDataAdd} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(bankBalance)}</td>
                  <td className={styles.totalsDataAdd} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(depCurrent)}</td>
                  <td className={styles.totalsDataSub} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-tuckCurrent)}</td>
                  <td className={styles.totalsDataSub} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-iceCurrent)}</td>
                  <td className={styles.totalsDataSub} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-(popCurrent + candyCurrent))}</td>
                  <td className={styles.totalsDataSub} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-bookCurrent)}</td>
                  <td className={styles.totalsDataSub} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-outCurrent)}</td>
                  <td className={styles.totalsDataSub} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-adjCurrent)}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card>
        
        {/* DAILY TOTALS Card with row-level downloads */}
        <Card>
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <h2 style={{ margin: 0 }}>DAILY TOTALS</h2>
          </Box>
          
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table style={{ width: "100%", minWidth: "1100px", maxWidth: "1150px", margin: "0 auto", borderCollapse: "collapse", textAlign: "center" }}>
              <thead>
                <tr>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>DAY</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>BALANCE</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>DEPOSITS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>TUCKSHOP</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>ICE CREAM</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>POPCORN/CANDY FLOSS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>BOOKS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>WITHDRAWALS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>ADJUSTMENTS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center" }}>DOWNLOAD</th>
                </tr>
              </thead>
              <tbody>
                {processedDailyTotals.map((dayData, idx) => {
                  // Prepare single row CSV data for this specific day
                  const singleDayCSVData = [
                    {
                      "DAY": dayData.dateText,
                      "BALANCE": dayData.runningBalance,
                      "DEPOSITS": dayData.dep,
                      "TUCKSHOP": -dayData.tuck,
                      "ICE CREAM": -dayData.ice,
                      "POPCORN/CANDY FLOSS": -dayData.popCandy,
                      "BOOKS": -dayData.book,
                      "WITHDRAWALS": -dayData.out,
                      "ADJUSTMENTS": -dayData.adj
                    }
                  ];
                  const sanitizedDateText = dayData.dateText.replace(/\s+/g, "_");
                  const rowFilename = `Daily Totals ${sanitizedDateText} ${currentTimestamp}.csv`;

                  return (
                    <tr key={idx}>
                      <td className={styles.headers} style={{ whiteSpace: "nowrap", fontSize: "0.95rem", textAlign: "center" }}>{dayData.dateText}</td>
                      <td className={styles.additions} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(dayData.runningBalance)}</td>
                      <td className={styles.additions} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(dayData.dep)}</td>
                      <td className={styles.subtractions} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-dayData.tuck)}</td>
                      <td className={styles.subtractions} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-dayData.ice)}</td>
                      <td className={styles.subtractions} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-dayData.popCandy)}</td>
                      <td className={styles.subtractions} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-dayData.book)}</td>
                      <td className={styles.subtractions} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-dayData.out)}</td>
                      <td className={styles.subtractions} style={{ fontSize: "0.95rem", textAlign: "center" }}>{euro.format(-dayData.adj)}</td>
                      <td style={{ fontSize: "0.95rem", textAlign: "center", padding: "8px 6px" }}>
                        <CSVLink
                          data={singleDayCSVData}
                          filename={rowFilename}
                          style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold", fontSize: "0.85rem" }}
                        >
                          📥 CSV
                        </CSVLink>
                      </td>
                    </tr>
                  );
                })}
                {processedDailyTotals.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ textAlign: "center", padding: "2rem", color: "#666", fontStyle: "italic" }}>
                      No transaction data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </Card>
    </Paper>
  );
};

export default SummaryComponent;
