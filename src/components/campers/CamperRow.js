import Link from "next/link";

const CamperRow = (props) => {
  const { accountId, firstName, lastName, startingBalance } = props.camper;
  const linkPath = `/campers/${accountId}`;
  // console.log(`starting balance: ${props.camper}`)
  return (
    <tr>
      <td>
        <Link href={linkPath}>{accountId}</Link>
      </td>
      <td>{firstName + ' ' + lastName }</td>
      <td>€{startingBalance}</td>
    </tr>
  );
};

export default CamperRow;
