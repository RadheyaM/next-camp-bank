import { Button } from "@mui/material";
import Link from "next/link";

const TransactionRow = (props) => {
  const { _id, accountId, timeStamp, category, type, amount} = props.trans;
  
  const humanTime = new Date(timeStamp).toLocaleTimeString();
  const humanDate = new Date(timeStamp).toLocaleDateString();
  const editPath = `/campers/${accountId}/${_id}/edit`
  const deletePath = `/campers/${accountId}/${_id}delete`

  return (
    <tr>
      <td>{_id}</td>
      <td suppressHydrationWarning>{humanDate + " " + humanTime}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>€{amount}</td>
      <td><Button variant="outlined" color="error">Delete</Button></td>
    </tr>
  );
};

export default TransactionRow;
