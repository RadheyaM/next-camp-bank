import Link from "next/link";

const CamperRow = (props) => {
  const { accountId, name, startingBalance } = props.camper;
  const linkPath = `/campers/${accountId}`;
  // console.log(`starting balance: ${props.camper}`)
  return (
    <tr>
      <td>
        <Link href={linkPath}>{accountId}</Link>
      </td>
      <td>{name}</td>
      <td>€{startingBalance}</td>
    </tr>
  );
};

export default CamperRow;
