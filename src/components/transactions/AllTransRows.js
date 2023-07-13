import Link from "next/link";

const AllTransRows = (props) => {
  const { accountId, _id, dateTimeStamp, type, category, amount } = props.trans;
  const linkPath = `/campers/${accountId}`
  
  let readableDate = new Date(dateTimeStamp).toLocaleString();
  
  return (
    <tr>
      <td><small>{_id}</small></td>
      <td><Link href={linkPath} replace>{accountId}</Link></td>
      <td>{readableDate}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default AllTransRows;
