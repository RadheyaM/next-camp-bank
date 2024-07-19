import { euro } from "../../../lib/helpers";

const TransactionRow = (props) => {
  const { timeStamp, category, type, amount, balance, note, user} = props.tran;

  const humanTime = new Date(timeStamp).toLocaleTimeString();
  const humanDate = new Date(timeStamp).toLocaleDateString();

  return (
    <tr>
      <td>{user}</td>
      <td suppressHydrationWarning>{humanDate + " " + humanTime}</td>
      <td>{category}</td>
      <td>{euro.format(Number(amount))}</td>
      <td>{note}</td>
    </tr>
  );
};

export default TransactionRow;
