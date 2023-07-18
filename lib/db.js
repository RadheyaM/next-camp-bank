if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.CONNECTION);
  return client;
};
