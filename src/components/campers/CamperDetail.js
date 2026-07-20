import AccountSummary from "../overview/AccountSummary";
import NewTransForm from "@/components/forms/NewTransForm";
import TransactionsTable from "../overview/TransactionTable";
import Paper from '@mui/material/Paper';
import { Grid, Box } from '@mui/material';

const CamperDetail = (props) => {
  const addTransactionsHandler = (transData) => {
    props.onAddTransactions(transData);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", margin: "0 auto", p: { xs: 0, md: 1 } }}>
      <Grid container spacing={3} alignItems="stretch">
        
        {/* Left Side: Account Summary & Rostered Campers Details */}
        <Grid item xs={12} lg={5} display="flex">
          <Paper 
            elevation={6} 
            sx={{
              p: 3, 
              backgroundColor: "#f8f8ff", 
              width: "100%", 
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <AccountSummary
              camper={props.camper}
              trans={props.trans}
              assignedCampers={props.assignedCampers}
              query={props.query}
              balance={props.balance}
            />
          </Paper>
        </Grid>

        {/* Right Side: Create Transactions form styled like a compact slip */}
        <Grid item xs={12} lg={7} display="flex">
          <Paper 
            elevation={6} 
            sx={{
              p: 3, 
              backgroundColor: "#f8f8ff", 
              width: "100%", 
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <NewTransForm
              onAddTransactions={addTransactionsHandler}
              camper={props.camper}
              balance={props.balance}
              scannedCode={props.scannedCode}
              assignedCampers={props.assignedCampers?.data?.data?.data || []}
            />
          </Paper>
        </Grid>

        {/* Bottom Side: Full-width Past Transactions Table */}
        <Grid item xs={12}>
          <Paper 
            elevation={6} 
            sx={{
              p: 3, 
              backgroundColor: "#f8f8ff", 
              borderRadius: "8px"
            }}
          >
            <TransactionsTable
              camper={props.camper}
              query={props.query}
              trans={props.trans}
            />
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default CamperDetail;
