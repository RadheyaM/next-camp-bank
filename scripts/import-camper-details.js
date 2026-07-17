const { MongoClient } = require('mongodb');
const xlsx = require('xlsx');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Error: MONGODB_URI is not defined in environment variables or .env.local");
  process.exit(1);
}

const excelFilePath = path.resolve(process.cwd(), '../2026 Badges and Bank.xlsx');

async function main() {
  if (!fs.existsSync(excelFilePath)) {
    console.error("Error: Excel file not found at", excelFilePath);
    process.exit(1);
  }

  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully.");

    const db = client.db("Campers");
    const col = db.collection("CamperDetails");

    console.log("Clearing any existing documents from CamperDetails collection...");
    const deleteResult = await col.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing details documents.`);

    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    console.log(`Processing ${rows.length} rows from Excel sheet...`);
    const camperDetails = [];
    const now = new Date();

    for (const row of rows) {
      const fullName = (row.Name || "").toString().trim();
      
      // Split the full name by space
      const nameParts = fullName.split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      camperDetails.push({
        firstName: firstName,
        lastName: lastName,
        camp: row.Camp || "",
        camperLeader: row["Camper/Leader"] || "",
        group: row.Group || "",
        room: "",
        accountQRCode: "",
        linkedQRCode: "",
        dateTimeCreated: now,
      });
    }

    console.log(`Inserting ${camperDetails.length} records into CamperDetails collection...`);
    const insertResult = await col.insertMany(camperDetails);
    console.log(`Successfully inserted ${insertResult.insertedCount} records.`);

  } catch (err) {
    console.error("An error occurred during import:", err);
  } finally {
    await client.close();
  }
}

main();
