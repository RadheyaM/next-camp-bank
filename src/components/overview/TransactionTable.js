import TransactionRow from './TransactionRow';
import styles from './TransactionTable.module.css'
import Table from '../UI/Table';

const TransactionsTable = props => {
  const { camperTrans } = props
  // console.log(camperTrans)
  if (camperTrans.length < 1 ) {
    return (
      <Table className={styles.transactionTable}>
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
        <tbody><tr><td className={styles.noData} colSpan={5}>No Transaction to Display Yet.</td></tr></tbody>
      </Table>
    )
  }
  return (
    <Table className={styles.transactionTable}>
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
        {camperTrans.map((trans) => (
          <TransactionRow key={trans._id} trans={trans}/>
        ))}
      </tbody> 
    </Table>
  )
}

export default TransactionsTable;