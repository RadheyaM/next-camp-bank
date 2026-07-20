import { euro } from "../../../lib/helpers";

const TransactionRow = (props) => {
  const { timeStamp, category, type, amount, balance, note, user, accessedBy, name } = props.tran;

  const humanTime = new Date(timeStamp).toLocaleTimeString("en-GB");
  const humanDate = new Date(timeStamp).toLocaleDateString("en-GB");

  return (
    <tr>
      <td>{user}</td>
      <td suppressHydrationWarning>{humanDate + " " + humanTime}</td>
      <td>{accessedBy || name || "Primary"}</td>
      <td>{category}</td>
      <td>{euro.format(Number(amount))}</td>
      <td>{note}</td>
    </tr>
  );
};

export default TransactionRow;
