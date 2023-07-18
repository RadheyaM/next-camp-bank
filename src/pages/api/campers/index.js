import connectToDatabase from "../../../../lib/db";

export const getAllCampers = async () => {
  const mongoClient = connectToDatabase();
  try {
    const db = mongoClient.db("Campers");
    const col = db.collection("Campers");
    const data = await col.find().toArray();
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
};

const Handler = async (req, res) => {
  const allCampersData = await getAllCampers();
  res.status(200).json({
    campers: allCampersData,
  });
};

export default Handler;
