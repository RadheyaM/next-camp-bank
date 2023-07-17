import path from 'path';
import { promises as fs } from 'fs';
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";


const handler = async (req, res) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/initial_campers.json', 'utf-8');
  const jsonParsed = JSON.parse(fileContents);
  try {
    console.log("connected to server");
    const db = mongoClient.db("Campers");
    const col = db.collection("Campers");
    const c = await col.insertMany(jsonParsed);
    res.status(200).json(fileContents);
  } catch (err) {
    console.log(err)
  } finally {
    await mongoClient.close()
  }
  
};

export default handler;
