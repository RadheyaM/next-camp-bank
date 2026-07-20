import clientPromise from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/auth";

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const settingsCol = db.collection("Settings");

  if (req.method === "GET") {
    try {
      let setting = await settingsCol.findOne({ _id: "allow_unassignment" });
      if (!setting) {
        // Seed default document if not present
        setting = { _id: "allow_unassignment", enabled: false };
        await settingsCol.insertOne(setting);
      }
      return res.status(200).json({ enabled: setting.enabled });
    } catch (error) {
      console.error("Error fetching unassignment setting:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    const { password, enabled } = req.body;

    if (password === undefined || enabled === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const usersCol = db.collection("users");
      const dylanUser = await usersCol.findOne({
        email: { $regex: /dylan/i }
      });

      if (!dylanUser) {
        return res.status(404).json({ message: "User Dylan not found in database" });
      }

      // Verify the password usingbcrypt compare
      const isValid = await verifyPassword(password, dylanUser.password);
      if (!isValid) {
        return res.status(401).json({ message: "Incorrect password for user Dylan" });
      }

      // Update toggle state
      await settingsCol.updateOne(
        { _id: "allow_unassignment" },
        { $set: { enabled: !!enabled } },
        { upsert: true }
      );

      return res.status(200).json({ success: true, enabled: !!enabled });
    } catch (error) {
      console.error("Error toggling unassignment setting:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
