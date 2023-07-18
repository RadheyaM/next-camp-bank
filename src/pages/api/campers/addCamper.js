import { connectToDatabase } from "../../../../lib/db";

export const addCamper = async (camper) => {
  const mongoClient = connectToDatabase();
  try {
    await mongoClient.connect();
    console.log("camper from api: ", camper);
    console.log("connected to server");
    const db = mongoClient.db("Campers");
    const col = db.collection("Campers");
    const p = await col.insertOne(camper);
    console.log("camper added!");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
};

const Handler = async (req, res) => {
  if (req.method === "POST") {
    console.log("you reached the Handler...");
    await addCamper(req.body);
    res.status(201).json({ message: "success!" });
  }
};

export default Handler;
