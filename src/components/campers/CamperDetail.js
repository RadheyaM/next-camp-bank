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
        camperTrans={props.camperTrans}
        balance={props.balance}
      />
      <NewTransForm
        onAddTransactions={addTransactionsHandler}
        camper={props.camper}
      />
      <TransactionsTable
        camperTrans={props.camperTrans}
        camper={props.camper}
        query={props.query}
      />
    </Card>
  );
};

export default CamperDetail;
