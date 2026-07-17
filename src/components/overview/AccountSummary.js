import { Fragment } from "react";
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
          <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
            Assigned Campers ({assignedList.length})
          </Typography>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: "0.8rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #1976d2", color: "#1976d2" }}>
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
                  return (
                    <tr key={c._id} style={{ borderBottom: "1px solid #e0e0e0" }}>
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
