import clientPromise from "../../../../lib/db";
import calcTotals from "../../../../lib/helpers";

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Transactions");
  const transData = await col.find({}).toArray();
  const bookCount = await col.find({category: "Book" }).count();
  const depCount = await col.find({category: "Deposit" }).count();
  const tuckCount = await col.find({category: "Tuckshop" }).count();
  const withCount = await col.find({category: "Withdrawal" }).count();
  const totals = calcTotals(transData, depCount, bookCount, tuckCount, withCount)
  const data = JSON.parse(JSON.stringify(totals));
  console.log("Data:")
  console.log(data)
  res.status(201).json({ data: data });
};

export default handler;