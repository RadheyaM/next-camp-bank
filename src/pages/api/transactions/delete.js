if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

export const deleteTransaction = async (transId) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);
  try {
    const db = mongoClient.db("Campers");
    const col = db.collection("Transactions");
    await col.updateOne({ _id: transId }, {$push: {deleted: new Date()}});
    console.log("deletion was successfull")
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
}

const handler = async() => {
  const trans = await deleteTransaction(req.query.transCode)
  res.status(201).json({ message: "you set this transaction to deleted status..."})
  return;
}

export default handler;

