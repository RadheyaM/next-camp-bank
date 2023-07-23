import Link from "next/link";
import { euro } from "../../../lib/helpers";

const AllTransRows = (props) => {
  const { accountId, _id, name, timeStamp, type, category, amount, note } = props.trans;
  const linkPath = `/campers/${accountId}`
  const humanTime = new Date(timeStamp).toLocaleTimeString();
  const humanDate = new Date(timeStamp).toLocaleDateString();
  
  return (
    <tr>
      <td><small>{_id}</small></td>
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
