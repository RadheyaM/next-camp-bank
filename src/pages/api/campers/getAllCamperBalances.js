import clientPromise from "../../../../lib/db";
import {allTransactionBalances} from "../../../../lib/helpers";
const converter = require('json-2-csv')
const fs = require('fs');

const handler = async (req, res) => {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("Transactions");
    const camperCol = db.collection("Campers")
    const deposits = await col.find({type: "Deposit"}).toArray();
    const payments = await col.find({type: "Payment"}).toArray();
    const camperIds = await camperCol.find({}).toArray();
    const balanceData = allTransactionBalances(deposits, payments, camperIds)
    const data = converter.json2csv(balanceData)
    res.status(201).json(JSON.parse(JSON.stringify({ data })));
}

export default handler;