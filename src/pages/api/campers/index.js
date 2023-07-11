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

export const getAllTransactions = async () => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const data = await mongoClient
    .db("Campers")
    .collection("Transactions")
    .find()
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

export const getAllCampers = async () => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const data = await mongoClient
    .db("Campers")
    .collection("Campers")
    .find()
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

export const addCamper = async (camper) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const response = await mongoClient
    .db("Campers")
    .collection("Campers")
    .insertOne(camper);

  return response.insertedId;
};

const Handler = async (req, res) => {
  if (req.method === "GET") {
    const camperTransData = await getCamperTransactions();
    const getAllTransactions = await getAllTransactions();
    const getAllCampers = await getAllCampers();
    res.status(200).json({
      campers: camperData,
      CamperTransactions: camperTransData,
      allTransactions: getAllTransactions,
      allCampers: getAllCampers,
    });
  } else if (req.method === "POST") {
    const camper = {
      accountId: req.body.accountId,
      name: req.body.name,
      startingBalance: req.body.startingBalance
    }
    const insertedId = await addCamper(camper);
    res.revalidate('/campers')
    res.status(200).json(insertedId);
  }
};

export default Handler;
