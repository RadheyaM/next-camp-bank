import clientPromise from "../../../../lib/db";

async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("Campers");
    const insert = await col.insertOne(req.body);
    res.status(201).json({ message: "success!" });
  } catch (error) {
    console.log("error: ", error);
  }
};

export default handler;
