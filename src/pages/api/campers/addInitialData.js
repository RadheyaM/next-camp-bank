import path from "path";
import { promises as fs } from "fs";
import clientPromise from "../../../../lib/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  // Check server-side session authentication
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Please sign in." });
  }

  const client = await clientPromise;
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/initial_camper_data.json", "utf-8");
  const jsonParsed = JSON.parse(fileContents);

  try {
    console.log("connected to server");
    const db = client.db("Campers");
    const col = db.collection("Campers");
    const c = await col.insertMany(jsonParsed);
    return res.status(200).json({ success: true, message: "Successfully seeded accounts!" });
  } catch (err) {
    console.error("Error seeding initial camper data:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
