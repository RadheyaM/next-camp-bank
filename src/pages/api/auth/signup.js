import { hashPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    if (!email || !email.includes("@") || !password || password.trim().length < 4) {
      res.status(422).json({ message: "Invalid Input..." });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db("Campers");
    const col = db.collection("users");
    const hashedPassword = await hashPassword(password);
    const result = await col.insertOne({
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User Created!" });
    client.close();
  }
};

export default handler;
