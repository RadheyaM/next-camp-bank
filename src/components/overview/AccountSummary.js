import { Fragment, useState } from "react";
import styles from "./AccountSummary.module.css";
import { euro } from "../../../lib/helpers";
import { Chip, Divider, Box, Typography } from "@mui/material";


const AccountSummary = (props) => {
  const { camper, query } = props;
  const transData = query.data.data.data;
  const camperId = camper.accountId;
  let balance = 0;

  const calcBalance = (transData) => {
    const depLst = [];
    const payLst = [];
    let depTotal = 0;
    let payTotal = 0;
    transData.map((tran) => {
      if (tran.type === "Payment") {
        payLst.push(Number(tran.amount));
      } else {
        depLst.push(Number(tran.amount))
      }
    });
    for (let i = 0; i < depLst.length; i++) {
      depTotal += depLst[i];
    }
  
    for (let i = 0; i < payLst.length; i++) {
      payTotal += payLst[i];
    }
    return depTotal - payTotal
  }

  try {
    balance = props.balance.data.data.data
  } catch (err) {
    balance = 0;
  }
  
  let assignedList = [];
  try {
    assignedList = props.assignedCampers.data.data.data || [];
    // Sort so primary account holder is always first
    assignedList.sort((a, b) => {
      const isAPrimary = a.accountQRCode === camper.accountId;
      const isBPrimary = b.accountQRCode === camper.accountId;
      if (isAPrimary && !isBPrimary) return -1;
      if (!isAPrimary && isBPrimary) return 1;
      return 0;
    });
  } catch (err) {
    assignedList = [];
  }

  const [expandedCampers, setExpandedCampers] = useState({});

  const toggleExpand = (code) => {
    setExpandedCampers(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  const downloadPDFSummary = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      let y = 15;

      const checkPageOverflow = (neededHeight) => {
        if (y + neededHeight > 280) {
          doc.addPage();
          y = 15;
        }
      };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(25, 118, 210); // MUI Primary Blue
      doc.text("CAMP BANK ACCOUNT SUMMARY", 15, y);
      y += 8;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated: ${new Date().toLocaleString("en-GB")}`, 15, y);
      y += 10;

      // Account Info Block Box
      doc.setFillColor(245, 247, 250);
      doc.setDrawColor(220, 225, 230);
      doc.rect(15, y, 180, 24, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Account ID: ${camper.accountId}`, 20, y + 6);
      doc.text(`Account Holder: ${camperName}`, 20, y + 12);
      doc.text(`Total Family Balance: ${euro.format(Number(balance))}`, 20, y + 18);
      y += 32;

      assignedList.forEach((member) => {
        checkPageOverflow(30);

        const isPrimary = member.accountQRCode === camper.accountId;
        const memberCodeStr = (member.accountQRCode || "").toString().trim();

        // Sibling Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(25, 118, 210);
        doc.text(`${member.firstName || ""} ${member.lastName || ""}`.trim() + (isPrimary ? " (Primary)" : " (Linked)"), 15, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text(`Role: ${member.camperLeader === "L" ? "Leader" : "Camper"}  |  Camp: ${member.camp || "-"}  |  Group: ${member.group || "-"}`, 15, y);
        y += 6;

        const memberTrans = [...transData]
          .filter((t) => (t.scannedCode || "").toString().trim() === memberCodeStr)
          .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

        if (memberTrans.length > 0) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(0, 0, 0);
          doc.setFillColor(235, 240, 245);
          doc.rect(15, y, 180, 6, "F");
          doc.text("Date", 17, y + 4.5);
          doc.text("Category", 55, y + 4.5);
          doc.text("Amount", 95, y + 4.5);
          doc.text("Note", 125, y + 4.5);
          doc.text("By", 175, y + 4.5);
          y += 6;

          memberTrans.forEach((t) => {
            checkPageOverflow(12);

            const dateStr = new Date(t.timeStamp).toLocaleDateString("en-GB") + " " + new Date(t.timeStamp).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
            const amountText = `${t.type === "Deposit" ? "+" : "-"}${euro.format(Number(t.amount))}`;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 0);
            doc.text(dateStr, 17, y + 5);
            doc.text(t.category || "-", 55, y + 5);

            if (t.type === "Deposit") {
              doc.setTextColor(46, 125, 50);
            } else {
              doc.setTextColor(211, 47, 47);
            }
            doc.setFont("helvetica", "bold");
            doc.text(amountText, 95, y + 5);

            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);

            const rawNote = t.note || "-";
            const splitNote = doc.splitTextToSize(rawNote, 45);
            doc.text(splitNote, 125, y + 5);

            doc.text(t.user || "-", 175, y + 5);

            const rowHeight = Math.max(6, splitNote.length * 4);
            y += rowHeight;

            doc.setDrawColor(240, 240, 240);
            doc.line(15, y, 195, y);
          });
        } else {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(8.5);
          doc.setTextColor(120, 120, 120);
          doc.text("No transaction history found for this specific member.", 17, y + 4);
          y += 8;
        }
        y += 6;
      });

      doc.save(`Account_Summary_${camper.accountId}.pdf`);
    } catch (err) {
      console.error("Error generating PDF receipt summary:", err);
    }
  };

  const camperName = (camper.firstName || camper.lastName)
    ? `${camper.firstName || ""} ${camper.lastName || ""}`.trim()
    : "Unassigned Account";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", textAlign: "center" }}>
      <h2>Account Details</h2>
      
      {/* Centered Vertically Stacked Account Items */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1, mb: 2, width: "100%" }}>
        {/* Row 1: Account ID */}
        <Typography variant="h3" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          {camper.accountId}
        </Typography>
        
        {/* Divider 1: Very short horizontal line, centered */}
        <Box sx={{ width: "40px", height: "3px", backgroundColor: "#bdbdbd", my: 1.5, borderRadius: "2px" }} />
        
        {/* Row 2: Name */}
        <Typography variant="h3" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          {camperName}
        </Typography>
        
        {/* Divider 2: Very short horizontal line, centered */}
        <Box sx={{ width: "40px", height: "3px", backgroundColor: "#bdbdbd", my: 1.5, borderRadius: "2px" }} />
        
        {/* Row 3: Current Balance */}
        <Typography variant="h3" sx={{ fontSize: "2.2rem", fontWeight: "bold", color: "#2e7d32" }}>
          {euro.format(Number(balance))}
        </Typography>
      </Box>

      {assignedList.length > 0 && (
        <Box sx={{ mt: 3, width: "100%" }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: "bold", mb: 0.5, textAlign: "center" }}>
            Assigned Campers ({assignedList.length})
          </Typography>
          
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <span
              onClick={downloadPDFSummary}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: "bold",
                fontSize: "0.82rem",
                display: "inline-block",
                borderBottom: "1px dashed #1976d2",
                transition: "color 0.2s"
              }}
            >
              📥 Download Account PDF Summary
            </span>
          </Box>

          <div style={{ overflowX: "auto", width: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: "0.8rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #1976d2", color: "#1976d2" }}>
                  <th style={{ padding: "6px" }}></th>
                  <th style={{ padding: "6px", fontWeight: "bold" }}>Name</th>
                  <th style={{ padding: "6px", fontWeight: "bold" }}>Role</th>
                  <th style={{ padding: "6px", fontWeight: "bold" }}>Camp</th>
                  <th style={{ padding: "6px", fontWeight: "bold" }}>Group</th>
                  <th style={{ padding: "6px", fontWeight: "bold" }}>Assignment Type</th>
                </tr>
              </thead>
              <tbody>
                {assignedList.map((c) => {
                  const isPrimary = c.accountQRCode === camper.accountId;
                  const camperCodeStr = (c.accountQRCode || "").toString().trim();
                  const isExpanded = !!expandedCampers[camperCodeStr];
                  
                  // Filter and explicitly sort transactions for this specific assigned account (most recent first)
                  const memberTrans = [...transData]
                    .filter((t) => (t.scannedCode || "").toString().trim() === camperCodeStr)
                    .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

                  return (
                    <Fragment key={c._id}>
                      <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                        <td style={{ padding: "8px 6px" }}>
                          <button
                            type="button"
                            onClick={() => toggleExpand(camperCodeStr)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "1rem",
                              color: "#1976d2",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto"
                            }}
                          >
                            {isExpanded ? "▼" : "▶"}
                          </button>
                        </td>
                        <td style={{ padding: "8px 6px", fontWeight: "bold" }}>
                          {c.firstName} {c.lastName}
                        </td>
                        <td style={{ padding: "8px 6px" }}>
                          {c.camperLeader === "L" ? "Leader" : "Camper"}
                        </td>
                        <td style={{ padding: "8px 6px" }}>{c.camp || "-"}</td>
                        <td style={{ padding: "8px 6px" }}>{c.group || "-"}</td>
                        <td style={{ padding: "8px 6px" }}>
                          <Chip
                            label={isPrimary ? "Primary Account" : "Linked Account"}
                            size="small"
                            color={isPrimary ? "success" : "info"}
                            variant="outlined"
                            sx={{ fontWeight: "bold", fontSize: "0.72rem", height: "20px" }}
                          />
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} style={{ backgroundColor: "#fbfcfd", padding: "12px" }}>
                            <Box sx={{ p: 1, border: "1px solid #e0e0e0", borderRadius: "4px", backgroundColor: "#fff" }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#1976d2", mb: 1, textAlign: "left" }}>
                                📑 Transactions for {c.firstName} {c.lastName} ({memberTrans.length})
                              </Typography>
                              {memberTrans.length > 0 ? (
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", textAlign: "center" }}>
                                  <thead>
                                    <tr style={{ borderBottom: "1px solid #ccc", color: "#666" }}>
                                      <th style={{ padding: "4px" }}>Date</th>
                                      <th style={{ padding: "4px" }}>Category</th>
                                      <th style={{ padding: "4px" }}>Amount</th>
                                      <th style={{ padding: "4px" }}>Note</th>
                                      <th style={{ padding: "4px" }}>By</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {memberTrans.map((t) => {
                                      const time = new Date(t.timeStamp).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
                                      const date = new Date(t.timeStamp).toLocaleDateString("en-GB");
                                      return (
                                        <tr key={t._id} style={{ borderBottom: "1px solid #eee" }}>
                                          <td style={{ padding: "6px 4px" }}>{date} {time}</td>
                                          <td style={{ padding: "6px 4px" }}>{t.category}</td>
                                          <td style={{ padding: "6px 4px", fontWeight: "bold", color: t.type === "Deposit" ? "green" : "red" }}>
                                            {t.type === "Deposit" ? "+" : "-"}{euro.format(Number(t.amount))}
                                          </td>
                                          <td style={{ padding: "6px 4px", fontStyle: "italic", color: "#555" }}>{t.note || "-"}</td>
                                          <td style={{ padding: "6px 4px", color: "#777" }}>{t.user}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              ) : (
                                <Typography variant="caption" sx={{ color: "#777", display: "block", p: 1, textAlign: "left" }}>
                                  No transaction history found for this specific member.
                                </Typography>
                              )}
                            </Box>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default AccountSummary;
