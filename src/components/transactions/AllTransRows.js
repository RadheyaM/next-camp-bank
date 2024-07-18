import Link from "next/link";
import { euro } from "../../../lib/helpers";

const AllTransRows = (props) => {
  const { accountId, user, name, timeStamp, type, category, amount, note } = props.trans;
  const linkPath = `/campers/${accountId}`
  const humanTime = new Date(timeStamp).toLocaleTimeString();
  const humanDate = new Date(timeStamp).toLocaleDateString();
  
  return (
    <tr>
      <td><small>{user}</small></td>
      <td><Link href={linkPath} replace>{accountId}</Link></td>
      <td>{name}</td>
      <td suppressHydrationWarning>{humanDate + " " + humanTime}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>{euro.format(Number(amount))}</td>
      <td>{euro.format(Number(balance))}</td>
      <td>{note}</td>
    </tr>
  );
};

export default AllTransRows;
