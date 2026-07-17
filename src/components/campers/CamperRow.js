import Link from "next/link";

const CamperRow = (props) => {
  const { accountId, firstName, lastName, startingBalance } = props.camper;
  const linkPath = `/campers/${accountId}`;
  const displayName = (firstName || lastName) ? `${firstName || ""} ${lastName || ""}`.trim() : "Unassigned Account";
  return (
    <tr>
      <td>
        <Link href={linkPath}>{accountId}</Link>
      </td>
      <td>{displayName}</td>
    </tr>
  );
};

export default CamperRow;
