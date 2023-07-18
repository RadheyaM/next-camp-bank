import CamperDetail from "@/components/campers/CamperDetail";
import clientPromise from "../../../../lib/db";

const CamperOverview = (props) => {
  const { camper, trans } = props;
  // const camperId = router.query.camperCode.toString();
  // const postTransactions = async (trans) => {
  //   await axios.post("/api/campers/[camperCode]", trans);
  // };
  const postTransactionsHandler = async (trans) => {
    console.log(trans);
    const response = await fetch("/api/campers/[campersCode]", {
      method: "POST",
      body: JSON.stringify(trans),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <CamperDetail
      camper={camper}
      trans={trans}
      onAddTransactions={postTransactionsHandler}
    />
  );
};

export default CamperOverview;

export const getStaticPaths = async () => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Campers");
  const data = await col.find({}, { accountId: 1 }).toArray();
  const allCampers = JSON.parse(JSON.stringify(data));
  console.log("all campers: ");
  return {
    paths: allCampers.map((camperId) => ({
      params: {
        camperCode: camperId.accountId.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const camperId = context.params.camperCode;
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Campers");
  const trans = db.collection("Transactions");
  const camper = await col.findOne({ accountId: camperId });
  const camperTrans = await trans.find({ accountId: camperId }).toArray();
  return {
    props: {
      camper: JSON.parse(JSON.stringify(camper)),
      trans: JSON.parse(JSON.stringify(camperTrans)),
    },
  };
};
