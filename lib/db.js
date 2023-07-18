if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

const connectToDatabase = () => {
  MongoClient.connect(process.env.CONNECTION)
}

export default connectToDatabase;