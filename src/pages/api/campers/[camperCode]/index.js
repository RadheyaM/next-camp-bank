import clientPromise from "../../../../../lib/db";
import { getToken } from "next-auth/jwt";

export const postCamperTransactions = async (transData) => {
  const mongoClient = await clientPromise;
  try {
    const client = await clientPromise;
    console.log("connected to server");
    const db = client.db("Campers");
    const col = db.collection("Transactions");
    const { dT, bT, tT, pT, iT, wT, aT } = transData;
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
        accessedBy: dT.accessedBy || "",
        scannedCode: dT.scannedCode || "",
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
        accessedBy: bT.accessedBy || "",
        scannedCode: bT.scannedCode || "",
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
        accessedBy: tT.accessedBy || "",
        scannedCode: tT.scannedCode || "",
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
        accessedBy: pT.accessedBy || "",
        scannedCode: pT.scannedCode || "",
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
        accessedBy: iT.accessedBy || "",
        scannedCode: iT.scannedCode || "",
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
        accessedBy: wT.accessedBy || "",
        scannedCode: wT.scannedCode || "",
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
        accessedBy: aT.accessedBy || "",
        scannedCode: aT.scannedCode || "",
      });
      console.log("adjustment added");
    }
  } catch (err) {
    console.log(err);
  }
};

const Handler = async (req, res) => {
  // Check server-side session authentication
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Please sign in." });
  }

  await postCamperTransactions(req.body);
  return res.status(201).json({ message: "You added the transactions..." });
};

export default Handler;
