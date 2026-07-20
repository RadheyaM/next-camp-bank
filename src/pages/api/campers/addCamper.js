import clientPromise from "../../../../lib/db";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  // Check server-side session authentication
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Please sign in." });
  }

  const { accountId, firstName, lastName, startingBalance, isStaff } = req.body;

  // Validate request schema
  if (!accountId || !/^\d{5}$/.test(accountId)) {
    return res.status(400).json({ message: "Invalid Account ID. Must be exactly 5 digits." });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("Campers");

    // Check if accountId already exists
    const existing = await col.findOne({ accountId });
    if (existing) {
      return res.status(400).json({ message: `Account ${accountId} already exists.` });
    }

    const insert = await col.insertOne({
      accountId: accountId.toString().trim(),
      firstName: (firstName || "").toString().trim(),
      lastName: (lastName || "").toString().trim(),
      startingBalance: (startingBalance || "0").toString().trim(),
      isStaff: !!isStaff,
      dateTimeCreated: new Date()
    });

    return res.status(201).json({ success: true, message: "Camper account created successfully!" });
  } catch (error) {
    console.error("Error creating camper account:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
