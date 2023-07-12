if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

export const getCamper = async (camperId) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const data = await mongoClient
    .db("Campers")
    .collection("Campers")
    .findOne({ accountId: camperId });

  return JSON.parse(JSON.stringify(data));
};

export const postCamperTransactions = async (transData) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);
  try {
    await mongoClient.connect();
    console.log("connected to server");
    const db = mongoClient.db("Campers");
    const col = db.collection("Transactions");
    const {
      depositTransaction,
      bookTransaction,
      tuckTransaction,
      withdrawalTransaction,
    } = transData;
    const d = await col.insertOne(depositTransaction);
    console.log("deposit added");
    const b = await col.insertOne(bookTransaction);
    console.log("book added");
    const t = await col.insertOne(tuckTransaction);
    console.log("tuck added");
    const w = await col.insertOne(withdrawalTransaction);
    console.log("withdrawal added");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
};

const Handler = async (req, res) => {
  if (req.method === "GET") {
    const camper = await getCamper(req.query.camperCode);
    if (!camper) {
      res.status(404).json("No camper data available...");
    } else {
      res.status(200).json({ camper: camper });
    }
  } else if (req.method === "POST") {
    console.log(req.body);
    await postCamperTransactions(req.body);
    res.status(201).json({ message: "You added the transactions..." });
  }
};

export default Handler;
