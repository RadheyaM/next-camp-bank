import clientPromise from "../../../../lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

async function handler(req, res) {
  const session = await getServerSession(res, res, authOptions)
  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("Campers");
      const col = db.collection("Campers");
      const insert = await col.insertOne(req.body);
      res.status(201).json({ message: "success!" });
    } catch (error) {
      console.log("error: ", error);
    }
  } else {
    res.send({
      error: "You must log in to access this page."
    })
  }
  
};

export default handler;
