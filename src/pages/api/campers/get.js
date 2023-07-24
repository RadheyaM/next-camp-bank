import clientPromise from "../../../../lib/db";
const fs = require('fs');

const writeLocal = (obj) => {
  const jsonStringify = JSON.stringify(obj);
  fs.writeFile('data/campers.json', jsonStringify, (err) => {
    if (err) throw err;
  });
  console.log('content has been saved')
}

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Campers");
  const campers = await col.find({}).toArray();
  const data = JSON.parse(JSON.stringify(campers))
  // writeLocal(data);
  res.status(200).json({data: data})
};

export default handler;