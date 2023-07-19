import clientPromise from "../../../../lib/db";

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Campers");
  const campers = await col.find({}).toArray();
  const data = JSON.parse(JSON.stringify(campers))
  res.status(200).json({data: data})
};

export default handler;