if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";


export const getAllTransactions = async () => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const data = await mongoClient
    .db("Campers")
    .collection("Transactions")
    .find()
    .toArray();

  return JSON.parse(JSON.stringify(data));
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
