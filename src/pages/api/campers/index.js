import clientPromise from "../../../../lib/db";

const handler = async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db("Campers")
    const campers = await db.collection("Campers").find().toArray()
    res.status(201).json({data: campers, message: "Find attached all campers"})
  } catch (error) {
    console.error(error);
  }
}

export default handler;