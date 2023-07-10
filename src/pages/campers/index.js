import AllCampersTable from "@/components/campers/AllCampersTable";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

const Campers = (props) => {
  return <AllCampersTable campers={props.campers} />;
};

export default Campers;

export const getStaticProps = async (context) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const data = await mongoClient.db().collection("Campers").find().toArray();
  // console.log("We got the data!", data)

  return {
    props: {
      campers: JSON.parse(JSON.stringify(data))
    }
  }
};
