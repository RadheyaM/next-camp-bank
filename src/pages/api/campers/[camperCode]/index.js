import clientPromise from "../../../../../lib/db";

export const postCamperTransactions = async (transData) => {
  const mongoClient = await clientPromise;
  try {
    const client = await clientPromise;
    console.log("connected to server");
    const db = client.db("Campers");
    const col = db.collection("Transactions");
    const { dT, bT, tT, wT } = transData;
    if (dT.accountId) {
      const d = await col.insertOne({
        accountId: dT.accountId,
        name: dT.name,
        type: dT.type,
        category: dT.category,
        amount: dT.amount.toString(),
        note: dT.note,
        user: dT.user,
        timeStamp: new Date(),
      });
      console.log("deposit added");
    }
    if (bT.accountId) {
      const b = await col.insertOne({
        accountId: bT.accountId,
        name: bT.name,
        type: bT.type,
        category: bT.category,
        amount: bT.amount.toString(),
        note: bT.note,
        user: bT.user,
        timeStamp: new Date(),
      });
      console.log("book added");
    }
    if (tT.accountId) {
      const t = await col.insertOne({
        accountId: tT.accountId,
        name: tT.name,
        type: tT.type,
        category: tT.category,
        amount: tT.amount.toString(),
        note: tT.note,
        user: tT.user,
        timeStamp: new Date(),
      });
      console.log("tuck added");
    }
    if (wT.accountId) {
      const w = await col.insertOne({
        accountId: wT.accountId,
        name: wT.name,
        type: wT.type,
        category: wT.category,
        amount: wT.amount.toString(),
        note: wT.note,
        user: wT.user,
        timeStamp: new Date(),
      });
      console.log("withdrawal added");
    }
  } catch (err) {
    console.log(err);
  }
};

const Handler = async (req, res) => {
  await postCamperTransactions(req.body);
  res.status(201).json({ message: "You added the transactions..." });
};

export default Handler;
