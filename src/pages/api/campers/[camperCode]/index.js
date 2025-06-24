import clientPromise from "../../../../../lib/db";

export const postCamperTransactions = async (transData) => {
  const mongoClient = await clientPromise;
  try {
    const client = await clientPromise;
    console.log("connected to server");
    const db = client.db("Campers");
    const col = db.collection("Transactions");
    const { dT, bT, tT, pT, cT, iT, wT, aT } = transData;
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
    if (pT.accountId) {
      const p = await col.insertOne({
        accountId: pT.accountId,
        name: pT.name,
        type: pT.type,
        category: pT.category,
        amount: pT.amount.toString(),
        note: pT.note,
        user: pT.user,
        timeStamp: new Date(),
      });
      console.log("tuck added");
    }
    if (cT.accountId) {
      const c = await col.insertOne({
        accountId: cT.accountId,
        name: cT.name,
        type: cT.type,
        category: cT.category,
        amount: cT.amount.toString(),
        note: cT.note,
        user: cT.user,
        timeStamp: new Date(),
      });
      console.log("tuck added");
    }
    if (iT.accountId) {
      const c = await col.insertOne({
        accountId: iT.accountId,
        name: iT.name,
        type: iT.type,
        category: iT.category,
        amount: iT.amount.toString(),
        note: iT.note,
        user: iT.user,
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
    if (aT.accountId) {
      const a = await col.insertOne({
        accountId: aT.accountId,
        name: aT.name,
        type: aT.type,
        category: aT.category,
        amount: aT.amount.toString(),
        note: aT.note,
        user: aT.user,
        timeStamp: new Date(),
      });
      console.log("adjustment added");
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
