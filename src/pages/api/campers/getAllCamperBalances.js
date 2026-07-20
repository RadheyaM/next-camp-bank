import clientPromise from "../../../../lib/db";
import {allTransactionBalances} from "../../../../lib/helpers";
const converter = require('json-2-csv')
const fs = require('fs');

const handler = async (req, res) => {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("Transactions");
    const camperCol = db.collection("Campers")

    // Fetch camper details from CamperDetails for category classification
    const camperDetailsCol = db.collection("CamperDetails");
    const details = await camperDetailsCol.find({}).toArray();
    
    // Build quick category lookup map
    const detailByCode = {};
    for (const d of details) {
      if (d.accountQRCode) {
        detailByCode[d.accountQRCode.toString().trim()] = d;
      }
    }

    const deposits = await col.find({type: "Deposit"}).toArray();
    const payments = await col.find({type: { $in: ["Payment", "Adjustment"] }}).toArray();
    const campers = await camperCol.find({}).toArray();

    // Decorate each camper/banking account with their correct category
    const categorizedCampers = campers.map((camper) => {
      const accountId = (camper.accountId || "").toString().trim();
      const detail = detailByCode[accountId];
      
      let category = "Unassigned";
      if (detail) {
        if (detail.linkedQRCode && detail.linkedQRCode.trim() !== "") {
          category = "Secondary";
        } else {
          category = "Primary";
        }
      }
      
      return {
        ...camper,
        category: category
      };
    });

    const balanceData = allTransactionBalances(deposits, payments, categorizedCampers)
    balanceData.sort((a, b) => Number(a.accountId || 0) - Number(b.accountId || 0));
    const data = converter.json2csv(balanceData)
    res.status(201).json(JSON.parse(JSON.stringify({ data })));
}

export default handler;