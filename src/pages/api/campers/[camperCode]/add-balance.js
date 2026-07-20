import clientPromise from "../../../../../lib/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  // Check server-side session authentication
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Please sign in." });
  }

  const { bal } = req.body;
  const camperId = req.query.camperCode;

  if (!bal || bal.balance === undefined) {
    return res.status(400).json({ message: "Missing balance parameter." });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("Campers");
    const refresh = await col.updateOne(
      { accountId: camperId },
      { $set: { startingBalance: bal.balance }}
    );

    return res.status(201).json({ message: "added balance" });
  } catch (error) {
    console.error("Error setting camper starting balance:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
