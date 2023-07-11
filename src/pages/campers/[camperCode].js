const { default: CamperDetail } = require("@/components/campers/CamperDetail");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import { getCamperTransactions } from "./../api/transactions/[camperCode]";
import { getCamper } from "./../api/campers/[camperCode]"

const CamperOverview = (props) => {
  const { camper, camperTrans } = props;
  return <CamperDetail camper={camper} camperTrans={camperTrans} />;
};

export default CamperOverview;

export const getStaticProps = async (context) => {
  const { params } = context;
  const camperId = params.camperCode;

  const accountData = await getCamper(camperId);
  const transactionData = await getCamperTransactions(camperId);
  
  return {
    props: {
      camper: accountData,
      camperTrans: transactionData,
    }
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { camperCode: "10001" } },
      { params: { camperCode: "10002" } },
      { params: { camperCode: "10003" } },
      { params: { camperCode: "10004" } },
      { params: { camperCode: "10005" } },
      { params: { camperCode: "10006" } },
      { params: { camperCode: "10007" } },
      { params: { camperCode: "10008" } },
      { params: { camperCode: "10009" } },
    ],
    fallback: false,
  };
};
