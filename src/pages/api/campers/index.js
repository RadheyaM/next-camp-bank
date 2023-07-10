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
    // expect a new camper to be sent with the request.
  }
};

export default Handler;
