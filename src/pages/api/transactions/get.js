if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

export const getTransaction = async (transId) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);
  try {
    const db = mongoClient.db("Campers");
    const col = db.collection("Transactions");
    const data = await col.findOne({ _id: transId });
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
}

const handler = async() => {
  const trans = await getTransaction(req.query.transCode)
  res.status(201).json({trans: trans})
  return;
}

export default handler;