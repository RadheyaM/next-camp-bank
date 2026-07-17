import Link from "next/link";
import { Chip } from "@mui/material";

const CamperRow = (props) => {
  const { accountId, firstName, lastName, category } = props.camper;
  const linkPath = `/campers/${accountId}`;
  const displayName = (firstName || lastName) ? `${firstName || ""} ${lastName || ""}`.trim() : "Unassigned Account";
  
  // Color code chips based on category
  const chipColor = 
    category === "Primary" ? "success" :
    category === "Secondary" ? "info" : "default";

  return (
    <tr>
      <td>
        <Link href={linkPath}>{accountId}</Link>
      </td>
      <td>{displayName}</td>
      <td>
        <Chip 
          label={category || "Unassigned"} 
          size="small" 
          color={chipColor} 
          variant="outlined" 
          sx={{ fontWeight: "bold" }}
        />
      </td>
    </tr>
  );
};

export default CamperRow;
