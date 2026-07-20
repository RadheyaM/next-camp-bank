import clientPromise from "../../../../lib/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const downloadsCol = db.collection("DailyDownloads");

  if (req.method === "GET") {
    try {
      const list = await downloadsCol.find({}).toArray();
      // Map list array into an object for fast O(1) key lookup on client
      const mapped = {};
      list.forEach((doc) => {
        mapped[doc._id] = doc.downloadedAt;
      });
      return res.status(200).json({ downloads: mapped });
    } catch (error) {
      console.error("Error fetching daily download settings:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    // Check server-side session authentication
    const token = await getToken({ req });
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Please sign in." });
    }

    const { dateKey, timestamp } = req.body;

    if (!dateKey || !timestamp) {
      return res.status(400).json({ message: "Missing required fields: dateKey and timestamp" });
    }

    try {
      await downloadsCol.updateOne(
        { _id: dateKey },
        { $set: { downloadedAt: timestamp } },
        { upsert: true }
      );
      return res.status(200).json({ success: true, message: "Successfully logged daily download timestamp!" });
    } catch (error) {
      console.error("Error saving daily download timestamp:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
