
const { default: CamperDetail } = require("@/components/campers/CamperDetail")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

const CamperOverview = (props) => {
  const { camper } = props
  return (
    <CamperDetail camper={camper}/>
  )
}

export default CamperOverview

export const getStaticProps = async (context) => {
  const { params } = context;
  const camperId = params.camperCode
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const data = await mongoClient.db().collection("Campers").findOne({accountId: camperId});
  console.log("We got the data!", data)

  return {
    props: {
      camper: JSON.parse(JSON.stringify(data))
    }
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { camperCode: "10001" }},
      { params: { camperCode: "10002" }},
      { params: { camperCode: "10003" }},
      { params: { camperCode: "10004" }},
    ],
    fallback: false
  };
};