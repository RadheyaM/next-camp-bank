if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";


export const getAllTransactions = async () => {
  const mongoClient = new MongoClient(process.env.CONNECTION);
  try {
    const db = mongoClient.db("Campers");
    const col = db.collection("Transactions");
    const data = await col.find().toArray();
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close()
  }
  
};

const Handler = async (req, res) => {
  if (req.method === "GET") {
    const getAllTransactions = await getAllTransactions();
    res.status(200).json({
      allTransactions: getAllTransactions
    });
  }
};

export default Handler;
