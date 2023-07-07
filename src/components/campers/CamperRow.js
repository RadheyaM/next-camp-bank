import Link from "next/link";

const CamperRow = (props) => {
  const { accountId, name, startingBalance } = props.camper;
  const linkPath = `/campers/${accountId}`;
  return (
    <tr>
      <td>
        <Link href={linkPath}>{accountId}</Link>
      </td>
      <td>{name}</td>
      <td>€{startingBalance.$numberDecimal}</td>
    </tr>
  );
};

export default CamperRow;
