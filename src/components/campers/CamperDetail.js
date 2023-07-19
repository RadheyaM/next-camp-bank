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
      <AccountSummary
        camper={props.camper}
        trans={props.trans}
        query={props.query}
        balance={props.balance}
      />
      <NewTransForm
        onAddTransactions={addTransactionsHandler}
        camper={props.camper}
        balance={props.balance}
      />
      <TransactionsTable
        camper={props.camper}
        query={props.query}
        trans={props.trans}
      />
    </Card>
  );
};

export default CamperDetail;
