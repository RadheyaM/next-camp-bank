const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local and .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Error: MONGODB_URI is not defined in environment variables or .env.local");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully.");

    const db = client.db("Campers");

    // 1. Create Unique Index on Campers.accountId
    console.log("Creating unique index on Campers.accountId...");
    const campersCol = db.collection("Campers");
    const res1 = await campersCol.createIndex({ accountId: 1 }, { unique: true });
    console.log("Created index:", res1);

    // 2. Create Index on Transactions.accountId
    console.log("Creating index on Transactions.accountId...");
    const transactionsCol = db.collection("Transactions");
    const res2 = await transactionsCol.createIndex({ accountId: 1 });
    console.log("Created index:", res2);

    // 3. Create Index on CamperDetails.accountQRCode
    console.log("Creating index on CamperDetails.accountQRCode...");
    const detailsCol = db.collection("CamperDetails");
    const res3 = await detailsCol.createIndex({ accountQRCode: 1 });
    console.log("Created index:", res3);

    // 4. Create Index on CamperDetails.linkedQRCode
    console.log("Creating index on CamperDetails.linkedQRCode...");
    const res4 = await detailsCol.createIndex({ linkedQRCode: 1 });
    console.log("Created index:", res4);

    console.log("All database indices applied successfully!");

  } catch (err) {
    console.error("An error occurred during indexing:", err);
  } finally {
    await client.close();
  }
}

main();
