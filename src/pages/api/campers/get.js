import clientPromise from "../../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    
    // 1. Fetch all camper details from CamperDetails collection
    const camperDetailsCol = db.collection("CamperDetails");
    const details = await camperDetailsCol.find({}).toArray();
    
    // Build a map of accountQRCode -> camper details for quick category classification
    const detailByCode = {};
    for (const d of details) {
      if (d.accountQRCode) {
        detailByCode[d.accountQRCode.toString().trim()] = d;
      }
    }

    // 2. Fetch all 375 banking accounts from Campers collection
    const col = db.collection("Campers");
    const campers = await col.find({}).toArray();

    // 3. Decorate each banking account with its category
    const categorizedCampers = campers.map((camper) => {
      const accountId = (camper.accountId || "").toString().trim();
      const detail = detailByCode[accountId];
      
      let category = "Unassigned";
      if (detail) {
        if (detail.linkedQRCode && detail.linkedQRCode.trim() !== "") {
          category = "Secondary";
        } else {
          category = "Primary";
        }
      }
      
      return {
        ...camper,
        category: category
      };
    });

    res.status(200).json({ data: categorizedCampers });
  } catch (error) {
    console.error("Error fetching accounts in get api:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
