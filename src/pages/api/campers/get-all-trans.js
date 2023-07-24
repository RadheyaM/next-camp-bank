import { tabClasses } from "@mui/material";
import clientPromise from "../../../../lib/db";
const fs = require('fs');

const writeLocal = (obj) => {
    const jsonStringify = JSON.stringify(obj);
    fs.writeFile('data/data.json', jsonStringify, (err) => {
      if (err) throw err;
    });
    console.log('content has been saved')
}

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Transactions");
  const trans = await col.find({}).toArray();
  const data = JSON.parse(JSON.stringify(trans));
  // writeLocal(data);
  res.status(201).json({ data: data });
};

export default handler;
