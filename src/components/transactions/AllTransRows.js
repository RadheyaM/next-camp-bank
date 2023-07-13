import Link from "next/link";

const AllTransRows = (props) => {
  const { accountId, _id, dateTimeStamp, type, category, amount } = props.trans;
  const linkPath = `/campers/${accountId}`
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };
  let readableDate = new Date(dateTimeStamp).toLocaleString(undefined, options);
  
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
