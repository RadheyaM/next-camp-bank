
const { default: CamperDetail } = require("@/components/campers/CamperDetail")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { MongoClient } from "mongodb";

const CamperOverview = (props) => {
  const { camper, camperTrans } = props
  return (
    <CamperDetail camper={camper} camperTrans={camperTrans}/>
  )
}

export default CamperOverview

export const getStaticProps = async (context) => {
  const { params } = context;
  const camperId = params.camperCode
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const accountData = await mongoClient.db().collection("Campers").findOne({accountId: camperId});
  const transactionData = await mongoClient.db().collection("Transactions").find({accountId: camperId}).toArray();
  console.log("CAMPERTRANS", transactionData)
  return {
    props: {
      camper: JSON.parse(JSON.stringify(accountData)),
      camperTrans: JSON.parse(JSON.stringify(transactionData)),
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