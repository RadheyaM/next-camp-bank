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
  } catch (err) {
    assignedList = [];
  }

  const camperName = (camper.firstName || camper.lastName)
    ? `${camper.firstName || ""} ${camper.lastName || ""}`.trim()
    : "Unassigned Account";

  return (
    <Fragment>
      <h2>Account Details</h2>
      <div className={styles.accountDetails}>
        <h3>{camper.accountId}&nbsp;|&nbsp;</h3>
        <h3>{camperName}&nbsp;|&nbsp;</h3>
        <h3>{euro.format(Number(balance))}</h3>
      </div>

      {assignedList.length > 0 && (
        <Box sx={{ mt: 4, width: "100%", maxWidth: "700px" }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            Assigned Campers ({assignedList.length})
          </Typography>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #1976d2", color: "#1976d2" }}>
                  <th style={{ padding: "8px", fontWeight: "bold" }}>Name</th>
                  <th style={{ padding: "8px", fontWeight: "bold" }}>Role</th>
                  <th style={{ padding: "8px", fontWeight: "bold" }}>Camp</th>
                  <th style={{ padding: "8px", fontWeight: "bold" }}>Group</th>
                  <th style={{ padding: "8px", fontWeight: "bold" }}>Assignment Type</th>
                </tr>
              </thead>
              <tbody>
                {assignedList.map((c) => {
                  const isPrimary = c.accountQRCode === camper.accountId;
                  return (
                    <tr key={c._id} style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <td style={{ padding: "10px 8px", fontWeight: "medium" }}>
                        {c.firstName} {c.lastName}
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        {c.camperLeader === "L" ? "Leader" : "Camper"}
                      </td>
                      <td style={{ padding: "10px 8px" }}>{c.camp || "-"}</td>
                      <td style={{ padding: "10px 8px" }}>{c.group || "-"}</td>
                      <td style={{ padding: "10px 8px" }}>
                        <Chip
                          label={isPrimary ? "Primary Account" : "Linked Account"}
                          size="small"
                          color={isPrimary ? "success" : "info"}
                          variant="outlined"
                          sx={{ fontWeight: "bold" }}
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
    </Fragment>
  );
};

export default AccountSummary;
