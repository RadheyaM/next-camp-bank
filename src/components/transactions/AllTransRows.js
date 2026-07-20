import Link from "next/link";
import { euro } from "../../../lib/helpers";

const AllTransRows = (props) => {
  const { accountId, user, name, timeStamp, type, category, amount, balance, note, accessedBy } = props.trans;
  const linkPath = `/campers/${accountId}`
  const humanTime = new Date(timeStamp).toLocaleTimeString("en-GB");
  const humanDate = new Date(timeStamp).toLocaleDateString("en-GB");
  
  return (
    <tr>
      <td><small>{user}</small></td>
      <td>
        <Link href={linkPath} replace style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
          {accountId}
        </Link>
      </td>
      <td>{name}</td>
      <td>{accessedBy || name}</td>
      <td suppressHydrationWarning>{humanDate + " " + humanTime}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td style={{ fontWeight: "bold", color: type === "Deposit" ? "green" : "red" }}>
        {type === "Deposit" ? "+" : "-"}{euro.format(Number(amount))}
      </td>
      <td>{note}</td>
    </tr>
  );
};

export default AllTransRows;
