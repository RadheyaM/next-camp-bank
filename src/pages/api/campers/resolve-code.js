import clientPromise from "../../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const code = (req.query.code || "").toString().trim();

  if (!code) {
    return res.status(400).json({ message: "Account code is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("CamperDetails");

    // Look up if this scanned code is assigned as a camper's primary accountQRCode
    const camper = await col.findOne({ accountQRCode: code });

    if (camper && camper.linkedQRCode && camper.linkedQRCode.trim() !== "") {
      // If they are linked to another account code (e.g. family sharing), redirect to the primary linked code
      const targetCode = camper.linkedQRCode.trim();
      console.log(`Resolving scanned code ${code} to primary linked account ${targetCode} for ${camper.firstName} ${camper.lastName}`);
      return res.status(200).json({ targetCode });
    }

    // Otherwise, open the code itself
    return res.status(200).json({ targetCode: code });
  } catch (error) {
    console.error(`Error resolving account code ${code}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
