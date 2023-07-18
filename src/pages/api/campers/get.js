import { connectToDatabase } from "../../../../lib/db";

export const getTransaction = async (transId) => {
  const mongoClient = connectToDatabase();
  try {
    console.log("you're in")
    const db = mongoClient.db("Campers");
    const col = db.collection("Transactions");
    const data = col.find({ _id: ObjectId(transId) });
    console.log("your data: ", JSON.parse(JSON.stringify(data)));
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
  return;
};
