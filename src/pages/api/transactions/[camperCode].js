import connectToDatabase from "../../../../lib/db";

export const getCamperTransactions = async (camperId) => {
  const mongoClient = connectToDatabase();
  try {
    const db = mongoClient.db("Campers");
    const col = db.collection("Transactions");
    const data = await col.find({ accountId: camperId }).toArray();
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
};

const Handler = async (req, res) => {
  const camperTransData = await getCamperTransactions(req.query.camperCode);
  res.status(200).json({
    transactions: camperTransData,
  });
};

export default Handler;
