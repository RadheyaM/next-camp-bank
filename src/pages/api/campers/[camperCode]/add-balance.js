import clientPromise from "../../../../../lib/db";

const handler = async (req, res) => {
  const { bal } = req.body;
  const camperId = req.query.camperCode;
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Campers");
  const refresh = await col.updateOne(
    { accountId: camperId },
    { $set: { startingBalance: bal.balance }}
    );

  res.status(201).json({ message: "added balance" });
};

export default handler;


