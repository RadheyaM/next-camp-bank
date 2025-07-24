import path from 'path';
import { promises as fs } from 'fs';
import clientPromise from '../../../../lib/db';


const handler = async (req, res) => {
  const client = await clientPromise
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/initial_camper_data.json', 'utf-8');
  const jsonParsed = JSON.parse(fileContents);
  try {
    console.log("connected to server");
    const db = client.db("Campers");
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
