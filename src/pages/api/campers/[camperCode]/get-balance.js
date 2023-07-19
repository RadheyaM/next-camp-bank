import clientPromise from "../../../../../lib/db";
import transactionBalance from "../../../../../lib/helpers";

const handler = async (req, res) => {
  const client = await clientPromise;
  const camperId = req.query.camperCode.toString();
  console.log("camperID", camperId)
  const db = client.db("Campers");
  const trans = db.collection("Transactions");
  const deposits = await trans.find({ accountId: camperId, type: "Deposit" }, { amount: 1 })
  .toArray();
  console.log("deposits", deposits)
  const payments = await trans.find({ accountId: camperId, type: "Payment" }, { amount: 1 })
  .toArray();
  console.log("payments", payments)
  const currentBalance = transactionBalance(deposits, payments);
  console.log("currentBalance", currentBalance)
  res.status(200).json(JSON.parse(JSON.stringify({data: currentBalance})))
}

export default handler;