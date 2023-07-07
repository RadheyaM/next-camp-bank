import TransactionRow from './TransactionRow';
import styles from './TransactionTable.module.css'

const TransactionsTable = props => {
  return (
    <table className={styles.transactionTable}>
      <caption><h2>Account Transactions</h2></caption>
      <thead>
        <tr>
          <th>Transaction Id</th>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <TransactionRow />
      </tbody>
    </table>
  )
}

export default TransactionsTable;