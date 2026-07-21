import { useState, useEffect } from "react";
import Card from "../UI/Card";
import styles from "./SummaryComponent.module.css"
import Table from "../UI/Table";
import { euro } from "../../../lib/helpers";
import Paper from '@mui/material/Paper';
import { CSVLink } from 'react-csv';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

const SummaryComponent = (props) => {
  const { query } = props;
  const allData = query.data?.data?.data || props.data || [];

  const [downloadTimes, setDownloadTimes] = useState({});
  const [downloadingDay, setDownloadingDay] = useState(null);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await fetch("/api/settings/downloads");
        if (res.ok) {
          const data = await res.json();
          setDownloadTimes(data.downloads || {});
        }
      } catch (err) {
        console.error("Error loading daily downloads settings:", err);
      }
    };
    fetchDownloads();
  }, []);

  const downloadEndOfDaySummary = async (dayData) => {
    setDownloadingDay(dayData.dateKey);
    try {
      const JSZip = (await import("jszip")).default;
      const { saveAs } = (await import("file-saver")).default;
      const { jsPDF } = await import("jspdf");

      const zip = new JSZip();

      // 1. Fetch current balances CSV string from server
      const balancesRes = await fetch("/api/campers/getAllCamperBalances");
      const balancesData = await balancesRes.json();
      const csvBalancesText = balancesData.data || "";
      zip.file(`Current_Balances_As_Of_${dayData.dateKey}.csv`, csvBalancesText);

      // 2. Compile all raw transactions to date (allTrans)
      const allTrans = allData || [];
      const csvHeaders = ["TRANSACTION ID", "ADDED BY", "ACCOUNT CODE", "NAME", "ACCESSED BY", "DATE & TIME", "TYPE", "CATEGORY", "AMOUNT (€)", "NOTE"];
      const csvRows = allTrans.map((t) => [
        t._id,
        t.user || "",
        t.accountId || "",
        t.name || "",
        t.accessedBy || t.name || "",
        new Date(t.timeStamp).toLocaleString('en-GB'),
        t.type || "",
        t.category || "",
        Number(t.amount) || 0,
        t.note || ""
      ]);
      const csvTransText = [csvHeaders.join(","), ...csvRows.map(row => row.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(","))].join("\n");
      zip.file(`All_Transactions_To_Date_As_Of_${dayData.dateKey}.csv`, csvTransText);

      // 3. Create 'Individual Account Summaries' folder
      const individualFolder = zip.folder("Individual Account Summaries");

      // Fetch all camper details from database for roster groupings
      const detailsRes = await fetch("/api/campers/get-details");
      const detailsData = await detailsRes.json();
      const rosterList = detailsData.data || [];

      // Find all unique accountId in transactions
      const activeAccountIds = Array.from(new Set(allTrans.map(t => t.accountId)));

      for (const accId of activeAccountIds) {
        // Filter transactions for this specific account
        const accountTrans = allTrans.filter(t => t.accountId === accId);
        const firstTran = accountTrans[0];
        const holderName = firstTran ? firstTran.name : "Primary Account Holder";

        // Calculate account balance dynamically
        let totalDeposits = 0;
        let totalPayments = 0;
        accountTrans.forEach(t => {
          const amt = Number(t.amount) || 0;
          if (t.type === "Deposit") totalDeposits += amt;
          else if (["Payment", "Adjustment"].includes(t.type)) totalPayments += amt;
        });
        const currentBalanceVal = totalDeposits - totalPayments;

        // Group assigned campers
        const assignedList = rosterList.filter(
          c => (c.accountQRCode || "").toString().trim() === accId || (c.linkedQRCode || "").toString().trim() === accId
        ).sort((a, b) => {
          const isAPrimary = a.accountQRCode === accId;
          const isBPrimary = b.accountQRCode === accId;
          if (isAPrimary && !isBPrimary) return -1;
          if (!isAPrimary && isBPrimary) return 1;
          return 0;
        });

        // Create PDF document
        const doc = new jsPDF();
        let pdfY = 15;

        const checkPDFPageOverflow = (neededHeight) => {
          if (pdfY + neededHeight > 280) {
            doc.addPage();
            pdfY = 15;
          }
        };

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(25, 118, 210);
        doc.text("CAMP BANK ACCOUNT SUMMARY", 15, pdfY);
        pdfY += 8;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated: ${new Date().toLocaleString("en-GB")}`, 15, pdfY);
        pdfY += 10;

        doc.setFillColor(245, 247, 250);
        doc.setDrawColor(220, 225, 230);
        doc.rect(15, pdfY, 180, 24, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Account ID: ${accId}`, 20, pdfY + 6);
        doc.text(`Account Holder: ${holderName}`, 20, pdfY + 12);
        doc.text(`Total Account Balance: ${euro.format(currentBalanceVal)}`, 20, pdfY + 18);
        pdfY += 32;

        assignedList.forEach((member) => {
          checkPDFPageOverflow(30);

          const isPrimary = member.accountQRCode === accId;
          const memberCodeStr = (member.accountQRCode || "").toString().trim();

          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(25, 118, 210);
          doc.text(`${member.firstName || ""} ${member.lastName || ""}`.trim() + (isPrimary ? " (Primary)" : " (Linked)"), 15, pdfY);
          pdfY += 5;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(80, 80, 80);
          doc.text(`Role: ${member.camperLeader === "L" ? "Leader" : "Camper"}  |  Camp: ${member.camp || "-"}  |  Group: ${member.group || "-"}`, 15, pdfY);
          pdfY += 6;

          const memberTrans = [...accountTrans]
            .filter((t) => (t.scannedCode || "").toString().trim() === memberCodeStr)
            .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

          if (memberTrans.length > 0) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 0);
            doc.setFillColor(235, 240, 245);
            doc.rect(15, pdfY, 180, 6, "F");
            doc.text("Date", 17, pdfY + 4.5);
            doc.text("Category", 55, pdfY + 4.5);
            doc.text("Amount", 95, pdfY + 4.5);
            doc.text("Note", 125, pdfY + 4.5);
            doc.text("By", 175, pdfY + 4.5);
            pdfY += 6;

            memberTrans.forEach((t) => {
              checkPDFPageOverflow(12);

              const dateStr = new Date(t.timeStamp).toLocaleDateString("en-GB") + " " + new Date(t.timeStamp).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
              const amountText = `${t.type === "Deposit" ? "+" : "-"}${euro.format(Number(t.amount))}`;

              doc.setFont("helvetica", "normal");
              doc.setFontSize(8);
              doc.setTextColor(0, 0, 0);
              doc.text(dateStr, 17, pdfY + 5);
              doc.text(t.category || "-", 55, pdfY + 5);

              if (t.type === "Deposit") {
                doc.setTextColor(46, 125, 50);
              } else {
                doc.setTextColor(211, 47, 47);
              }
              doc.setFont("helvetica", "bold");
              doc.text(amountText, 95, pdfY + 5);

              doc.setFont("helvetica", "normal");
              doc.setTextColor(0, 0, 0);

              const rawNote = t.note || "-";
              const splitNote = doc.splitTextToSize(rawNote, 45);
              doc.text(splitNote, 125, pdfY + 5);

              doc.text(t.user || "-", 175, pdfY + 5);

              const rowHeight = Math.max(6, splitNote.length * 4);
              pdfY += rowHeight;

              doc.setDrawColor(240, 240, 240);
              doc.line(15, pdfY, 195, pdfY);
            });
          } else {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(8.5);
            doc.setTextColor(120, 120, 120);
            doc.text("No transaction history found for this specific member.", 17, pdfY + 4);
            pdfY += 8;
          }
          pdfY += 6;
        });

        const pdfOutput = doc.output("arraybuffer");
        const sanitizedHolderName = holderName.replace(/[^a-zA-Z0-9]/g, "_").replace(/__+/g, "_");
        individualFolder.file(`Account_Summary_${accId}_${sanitizedHolderName}.pdf`, pdfOutput);
      }

      const getFileTimestamp = () => {
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

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `End_Of_Day_Summary_${dayData.dateKey}_${getFileTimestamp()}.zip`);

      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const localUser = localStorage.getItem("User") || "Teller";
      const timestampString = `${pad(d.getDate())}-${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()]}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} (${localUser})`;

      const logRes = await fetch("/api/settings/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dateKey: dayData.dateKey,
          timestamp: timestampString
        })
      });

      if (logRes.ok) {
        setDownloadTimes(prev => ({
          ...prev,
          [dayData.dateKey]: timestampString
        }));
      }

    } catch (err) {
      console.error("Error generating End-Of-Day ZIP package:", err);
    } finally {
      setDownloadingDay(null);
    }
  };

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
      dateKey,
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

        {/* DAILY DATA DOWNLOAD Card */}
        <Card sx={{ mt: 4 }}>
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <h2 style={{ margin: 0 }}>DAILY DATA DOWNLOAD</h2>
            <Typography variant="caption" color="textSecondary" sx={{ fontStyle: "italic", mt: 0.5, display: "block" }}>
              Downloads a complete current ZIP archive containing overall balances, transaction histories, and individual account summaries up to today.
            </Typography>
          </Box>

          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table style={{ width: "100%", minWidth: "1100px", maxWidth: "1150px", margin: "0 auto", borderCollapse: "collapse", textAlign: "center" }}>
              <thead>
                <tr>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center", width: "33%" }}>DAY</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center", width: "33%" }}>ACTIONS</th>
                  <th className={styles.totals} style={{ fontSize: "0.78rem", textAlign: "center", width: "34%" }}>DOWNLOADED</th>
                </tr>
              </thead>
              <tbody>
                {processedDailyTotals.map((dayData, idx) => {
                  const logTimestamp = downloadTimes[dayData.dateKey] || "";
                  const isProcessing = downloadingDay === dayData.dateKey;

                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <td className={styles.headers} style={{ whiteSpace: "nowrap", fontSize: "0.95rem", textAlign: "center", padding: "12px 6px" }}>
                        {dayData.dateText}
                      </td>
                      <td style={{ fontSize: "0.95rem", textAlign: "center", padding: "12px 6px" }}>
                        {processedDailyTotals.length > 1 && idx < processedDailyTotals.length - 1 ? (
                          <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.25rem", color: "#d32f2f", fontWeight: "bold", fontSize: "0.82rem" }}>
                            <span>🔒 Locked</span>
                          </Box>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => downloadEndOfDaySummary(dayData)}
                            disabled={downloadingDay !== null}
                            sx={{ fontWeight: "bold", fontSize: "0.78rem" }}
                            startIcon={isProcessing ? <CircularProgress size={14} color="inherit" /> : null}
                          >
                            {isProcessing ? "Generating ZIP..." : "Download End of Day Summary"}
                          </Button>
                        )}
                      </td>
                      <td style={{ fontSize: "0.95rem", textAlign: "center", padding: "12px 6px", fontWeight: logTimestamp ? "bold" : "normal", color: logTimestamp ? "#2e7d32" : "#9e9e9e" }}>
                        {logTimestamp ? `✅ ${logTimestamp}` : "-"}
                      </td>
                    </tr>
                  );
                })}
                {processedDailyTotals.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center", padding: "2rem", color: "#666", fontStyle: "italic" }}>
                      No active dates found.
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
