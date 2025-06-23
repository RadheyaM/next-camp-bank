import Link from "next/link";
import { euro } from "../../../lib/helpers";

const AllTransRows = (props) => {
  const { accountId, user, name, timeStamp, type, category, amount, balance, note } = props.trans;
  const linkPath = `/campers/${accountId}`
  const humanTime = new Date(timeStamp).toLocaleTimeString("en-GB");
  const humanDate = new Date(timeStamp).toLocaleDateString("en-GB");
  
  return (
    <tr>
      <td><small>{user}</small></td>
      <td><Link href={linkPath} replace>{accountId}</Link></td>
      <td>{name}</td>
      <td suppressHydrationWarning>{humanDate + " " + humanTime}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>{euro.format(Number(amount))}</td>
      <td>{note}</td>
    </tr>
  );
};

export default AllTransRows;
