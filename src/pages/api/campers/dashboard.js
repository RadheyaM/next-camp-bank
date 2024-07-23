import clientPromise from "../../../../lib/db";

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Transactions");
  const trans = await col.find({}).toArray();
  const data = JSON.parse(JSON.stringify(trans));
  res.status(201).json({ data: data });
};

export default handler;