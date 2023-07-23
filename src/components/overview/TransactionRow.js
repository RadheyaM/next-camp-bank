import { euro } from "../../../lib/helpers";

const TransactionRow = (props) => {
  const { timeStamp, category, type, amount, note} = props.tran;

  const humanTime = new Date(timeStamp).toLocaleTimeString();
  const humanDate = new Date(timeStamp).toLocaleDateString();

  return (
    <tr>
      <td suppressHydrationWarning>{humanDate + " " + humanTime}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>{euro.format(Number(amount))}</td>
      <td>{note}</td>
    </tr>
  );
};

export default TransactionRow;
