import AccountSummary from "../overview/AccountSummary";
import NewTransForm from "@/components/forms/NewTransForm";
import TransactionsTable from "../overview/TransactionTable";
import Card from "../UI/Card";
import Paper from '@mui/material/Paper';

const CamperDetail = (props) => {
  const addTransactionsHandler = (transData) => {
    // console.log("Trans Data: ", transData)
    props.onAddTransactions(transData);
  };
  return (
    <>
      <Paper elevation={6} sx={{
        width: "95%", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem", 
        backgroundColor: "#f8f8ff"}}>
        <AccountSummary
          camper={props.camper}
          trans={props.trans}
          query={props.query}
          balance={props.balance}
        />
      </Paper>
      <Paper elevation={6} sx={{
        width: "95%", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        paddingBottom: "3rem",
        backgroundColor: "#f8f8ff"}}>
        <NewTransForm
          onAddTransactions={addTransactionsHandler}
          camper={props.camper}
          balance={props.balance}
        />
      </Paper>
      <Paper elevation={6} sx={{
        width: "95%", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem", 
        backgroundColor: "#f8f8ff"}}>
        <TransactionsTable
          camper={props.camper}
          query={props.query}
          trans={props.trans}
        />
      </Paper>
    </>
  );
};

export default CamperDetail;
