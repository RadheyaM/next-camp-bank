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
    const detailsCol = db.collection("CamperDetails");
    const campersCol = db.collection("Campers");
    const transactionsCol = db.collection("Transactions");

    // 1. Reset all assignments in CamperDetails collection
    console.log("Resetting all accountQRCode and linkedQRCode fields in CamperDetails to empty strings...");
    const resetDetailsResult = await detailsCol.updateMany(
      {},
      {
        $set: {
          accountQRCode: "",
          linkedQRCode: "",
          dateTimeUpdated: new Date()
        }
      }
    );
    console.log(`Successfully updated ${resetDetailsResult.modifiedCount} roster camper documents.`);

    // 2. Clear all synced camper names in the banking Campers collection
    console.log("Clearing synced names (firstName & lastName) in banking Campers collection...");
    const resetCampersResult = await campersCol.updateMany(
      {},
      {
        $set: {
          firstName: "",
          lastName: "",
          dateTimeUpdated: new Date()
        }
      }
    );
    console.log(`Successfully reset names for ${resetCampersResult.modifiedCount} banking accounts.`);

    // 3. Clear developmental transactions to ensure a pristine financial state
    console.log("Clearing developmental transactions from Transactions collection...");
    const clearTransactionsResult = await transactionsCol.deleteMany({});
    console.log(`Successfully deleted ${clearTransactionsResult.deletedCount} developmental transaction logs.`);

    console.log("\nDatabase reset complete! All systems are in a pristine, unassigned state and ready for real campers.");

  } catch (err) {
    console.error("Database reset failed with error:", err);
  } finally {
    await client.close();
  }
}

main();
