if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

export const addCamper = async (camper) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const response = await mongoClient
    .db("Campers")
    .collection("Campers")
    .insertOne(camper);

  return response.insertedId;
};

const Handler = async (req, res) => {
  if (req.method === 'POST') {
    await addCamper(req.body)
    res.status(201).json({message : "success!"});
  }
  
};

export default Handler;
