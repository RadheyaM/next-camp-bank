import TransactionRow from './TransactionRow';
import styles from './TransactionTable.module.css'
import Table from '../UI/Table';
import sortBy from 'array-sort-by';


const TransactionsTable = props => {
  const { query, trans } = props;
  const transData = query.data.data.data;
  // console.log("query", transData)
  // console.log("trans", props.trans)
  const sortByDate = sortBy(props.query.data.data.data, tran => -new Date(tran.timeStamp))
  return (
    <Table className={styles.transactionTable}>
      <caption>
        <h2>Account Transactions</h2>
        </caption>
      <thead>
        <tr>
          <th>Added By</th>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Note</th>
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