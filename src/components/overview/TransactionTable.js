import TransactionRow from './TransactionRow';
import styles from './TransactionTable.module.css'
import Table from '../UI/Table';
import sortBy from 'array-sort-by';
import { Box, Typography } from '@mui/material';

const TransactionsTable = props => {
  const { query, trans } = props;
  const sortByDate = sortBy([...props.query.data.data.data], tran => -new Date(tran.timeStamp));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Account Transactions History</h2>
      
      <Box sx={{ width: "100%", maxWidth: "850px", overflowX: "auto" }}>
        <Table className={styles.transactionTable} style={{ width: "100%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Added By</th>
              <th>Date</th>
              <th>Accessed By</th>
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
      </Box>
    </Box>
  );
};

export default TransactionsTable;
