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

const Handler = async (req, res) => {
  const camper = await getCamper(req.query.camperCode);
  if (!camper) {
    res.status(404).json("No camper data available...");
  } else {
    res.status(200).json({ camper: camper });
  }
};

export default Handler;
