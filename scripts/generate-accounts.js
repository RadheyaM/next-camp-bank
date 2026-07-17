const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
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
    console.log("Connected to MongoDB database successfully.");
    
    const db = client.db("Campers");
    const col = db.collection("Campers");
    
    // Clear the collection first as requested/confirmed
    console.log("Clearing any existing documents from Campers collection...");
    const deleteResult = await col.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing documents.`);

    const campers = [];
    const now = new Date();
    
    for (let i = 10001; i <= 10375; i++) {
      campers.push({
        accountId: i.toString(),
        firstName: "",
        lastName: "",
        startingBalance: "0",
        isStaff: false,
        dateTimeCreated: now,
      });
    }

    console.log(`Inserting 375 new camper accounts (10001 - 10375)...`);
    const result = await col.insertMany(campers);
    console.log(`Successfully inserted ${result.insertedCount} accounts.`);
    
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
  }
}

main();
