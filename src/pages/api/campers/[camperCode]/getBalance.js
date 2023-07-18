import { connectToDatabase } from "../../../../../lib/db";

const transactionBalance = (depArray, payArray) => {
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < depArray.length; i++) {
    sum1 += Number(depArray[i].amount);
  }

  for (let i = 0; i < payArray.length; i++) {
    sum2 += Number(payArray[i].amount);
  }
  return sum1 - sum2;
};

export const getCurrentBalance = async (camperId) => {
  const mongoClient = connectToDatabase();
  try {
    await mongoClient.connect();
    console.log("connected to server");
    console.log(camperId)
    const db = mongoClient.db("Campers");
    const col = db.collection("Transactions");
    const colTwo = db.collection("Campers");
    const camperDeposits = await col
      .find({ accountId: camperId, type: "Deposit" }, { amount: 1 })
      .toArray();
    console.log("deposits received to array...", camperDeposits);
    const camperPayments = await col
      .find({ accountId: camperId, type: "Payment" }, { amount: 1 })
      .toArray();
    console.log("payments received to array...", camperPayments);
    const startingBalance = await colTwo.findOne({ accountId: camperId }, { startingBalance: 1 });
    console.log("camper's starting balance received...", startingBalance);
    const tB = transactionBalance(camperDeposits, camperPayments);
    console.log("transaction balance calculated...");
    const currentAccountBalance = Number(startingBalance.startingBalance) + tB;
    return JSON.parse(JSON.stringify(currentAccountBalance));
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close()
  }
};

const Handler = async (req, res) => {
  // console.log("here is the request:", req)
  const balance = await getCurrentBalance(req.query.camperCode)
  res.status(200).json({ balance: balance });
};

export default Handler;