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
    const { dT, bT, tT, wT } = transData;
    if (dT.accountId) {
      const d = await col.insertOne({
        accountId: dT.accountId,
        name: dT.name,
        type: dT.type,
        category: dT.category,
        amount: dT.amount.toString(),
        timeStamp: new Date(),
      });
      console.log("deposit added");
    }
    if (bT.accountId) {
      const b = await col.insertOne({
        accountId: bT.accountId,
        name: bT.name,
        type: bT.type,
        category: bT.category,
        amount: bT.amount.toString(),
        timeStamp: new Date(),
      });
      console.log("book added");
    }
    if (tT.accountId) {
      const t = await col.insertOne({
        accountId: tT.accountId,
        name: tT.name,
        type: tT.type,
        category: tT.category,
        amount: tT.amount.toString(),
        timeStamp: new Date(),
      });
      console.log("tuck added");
    }
    if (wT.accountId) {
      const w = await col.insertOne({
        accountId: wT.accountId,
        name: wT.name,
        type: wT.type,
        category: wT.category,
        amount: wT.amount.toString(),
        timeStamp: new Date(),
      });
      console.log("withdrawal added");
    }
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
};

const Handler = async (req, res) => {
  if (req.method === "GET") {
    const camper = await getCamper(req.query.camperCode);
    if (!camper || !currentBalance) {
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