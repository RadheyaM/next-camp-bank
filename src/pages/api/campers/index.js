if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

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
    const getAllCampers = await getAllCampers();
    res.status(200).json({
      allCampers: getAllCampers,
    });
  }
};

export default Handler;
