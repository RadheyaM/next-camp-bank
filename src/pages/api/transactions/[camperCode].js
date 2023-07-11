if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

export const getCamperTransactions = async (camperId) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const data = await mongoClient
    .db("Campers")
    .collection("Transactions")
    .find({ accountId: camperId })
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

const Handler = async (req, res) => {
  if (req.method === "GET") {
    const camperTransData = await getCamperTransactions();
    res.status(200).json({
      CamperTransactions: camperTransData
    });
  }
};

export default Handler; 