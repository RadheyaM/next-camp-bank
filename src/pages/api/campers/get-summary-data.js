import clientPromise from "../../../../lib/db";
import { addDay } from "../../../../lib/helpers";
const fs = require('fs');

const handler = async (req, res) => {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("Transactions");
    const trans = await col.find({}).toArray();
    const dayAdded = addDay(trans)
    const data = JSON.parse(JSON.stringify(dayAdded));
    res.status(201).json({data: data});
};

export default handler;