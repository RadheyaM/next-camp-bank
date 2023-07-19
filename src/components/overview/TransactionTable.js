import TransactionRow from './TransactionRow';
import styles from './TransactionTable.module.css'
import Table from '../UI/Table';
import sortBy from 'array-sort-by';


const TransactionsTable = props => {
  // console.log(props.query.data)
  const {trans} = props
  const sortByDate = sortBy(trans, tran => -new Date(tran.timeStamp))
  console.log("sortbydate: ", sortByDate)
  return (
    <Table className={styles.transactionTable}>
      <caption>
        <h2>Account Transactions</h2>
        <h3>Camper Starting Balance: {props.camper.startingBalance}</h3>
        </caption>
      <thead>
        <tr>
          <th>Transaction Id</th>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {sortByDate.map((tran) => (
          <TransactionRow key={tran._id} tran={tran}/>
        ))}
      </tbody> 
    </Table>
  )
}

export default TransactionsTable;