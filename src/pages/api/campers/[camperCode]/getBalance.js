import clientPromise from "../../../../../lib/db";
import { transactionBalance } from "../../../../../lib/helpers";
// import { useRouter } from "next/router";

const handler = async (req, res) => {
  try {
    // const router = useRouter();
    // const code = router.query.camperCode
    console.log("request", req)
    const camperId = req.query.camperId;
    const client = await clientPromise;
    const db = client.db("Campers");
    const colTrans = db.collection("Transactions");
    const colCampers = db.collection("Campers");
    const camperDeposits = await colTrans
      .find({ accountId: camperId, type: "Deposit" }, { amount: 1 })
      .toArray();
    console.log("Deposits", camperDeposits)
    const camperPayments = await colTrans
      .find({ accountId: camperId, type: "Payment" }, { amount: 1 })
      .toArray();
    const currentAccountBalance = transactionBalance(
      camperDeposits,
      camperPayments
    );
    return res.status(201).json({ balance: currentAccountBalance });
  } catch (error) {
    console.log(error);
  }
};

export default handler;