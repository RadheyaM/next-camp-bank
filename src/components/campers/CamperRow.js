import Link from "next/link";

const CamperRow = (props) => {
  const { accountId, name, balance } = props.camper;
  const linkPath = `/campers/${accountId}`;
  return (
    <tr>
      <td>
        <Link href={linkPath}>{accountId}</Link>
      </td>
      <td>{name}</td>
      <td>{balance}</td>
    </tr>
  );
};

export default CamperRow;
