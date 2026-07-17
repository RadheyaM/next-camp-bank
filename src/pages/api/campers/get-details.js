import clientPromise from "../../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("CamperDetails");
    
    // Fetch all details sorted alphabetically by firstName, then lastName
    const details = await col.find({}).sort({ firstName: 1, lastName: 1 }).toArray();
    
    res.status(200).json({ data: details });
  } catch (error) {
    console.error("Error fetching camper details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
