import clientPromise from "../../../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const client = await clientPromise;
  const camperId = req.query.camperCode.toString();
  const db = client.db("Campers");
  const col = db.collection("CamperDetails");
  
  try {
    // Find all campers associated with this primary account code
    const assigned = await col.find({
      $or: [
        { accountQRCode: camperId },
        { linkedQRCode: camperId }
      ]
    }).toArray();
    
    res.status(200).json({ data: assigned });
  } catch (error) {
    console.error(`Error fetching assigned campers for account ${camperId}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
