import clientPromise from "../../../../lib/db";
const fs = require('fs');

export const writeLocal = async (obj) => {
    const currentDate = new Date();
    const filePath = `data/data_${currentDate.toJSON().slice(0,10)}.json`
    const jsonStringify = JSON.stringify(obj);
    fs.writeFileSync(filePath, jsonStringify, (err) => {
      if (err) throw err;
    });
    console.log('content has been saved')
    return filePath;
}

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Transactions");
  // const trans = await col.find({}).sort({timeStamp: -1}).limit(50).toArray();
  const trans = await col.find({}).toArray();
  const data = JSON.parse(JSON.stringify(trans));
  await writeLocal(data);
  res.status(201).json({ message: "Json data file created" });
};

export default handler;
