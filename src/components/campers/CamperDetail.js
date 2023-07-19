import AccountSummary from "../overview/AccountSummary";
import NewTransForm from "@/components/forms/NewTransForm";
import TransactionsTable from "../overview/TransactionTable";
import Card from "../UI/Card";

const CamperDetail = (props) => {
  const addTransactionsHandler = (transData) => {
    // console.log("Trans Data: ", transData)
    props.onAddTransactions(transData);
  };
  return (
    <Card>
      <h1>Camper Detail</h1>
      <AccountSummary
        camper={props.camper} trans={props.trans} query={props.query}
      />
      <NewTransForm
        onAddTransactions={addTransactionsHandler}
        camper={props.camper}
      />
      <TransactionsTable
        camper={props.camper} query={props.query} trans={props.trans}
      />
    </Card>
  );
};

export default CamperDetail;
