import hashPassword from "../../../../lib/auth";
import connectToDatabase from "../../../../lib/db";

const handler = async(res, req) => {
  const data = req.body;
  const { email, password } = data;
  if (!email || !email.includes('@') || !password.trim().length < 4 ) {
    res.status(422).json({ message: "Invalid Input..."})
    return;
  }
  const client = await connectToDatabase(password);
  const db = client.db("Campers");
  const col = db.collection('users')
  const hashedPassword = hashPassword();
  const result = await col.insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({message: 'User Created!'});
  return
};

export default handler;