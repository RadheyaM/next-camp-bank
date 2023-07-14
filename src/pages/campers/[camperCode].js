const { default: CamperDetail } = require("@/components/campers/CamperDetail");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { getCamperTransactions } from "./../api/transactions/[camperCode]";
import { getCamper } from "../api/campers/[camperCode]";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";

const CamperOverview = (props) => {
  const router = useRouter();
  const { camper, camperTrans } = props;
  const camperId = router.query.camperCode.toString();
  const camperApiPath = `/api/transactions/${camperId}`;
  const balanceApiPath = `/api/campers/${camperId}/getBalance`;
  //GET
  const query = useQuery(
    ["transactions"],
    () => {
      return axios.get(camperApiPath);
    },
    {
      initialData: {
        data: {
          transactions: props.camperTrans,
        },
      },
    }
  );
  const balanceQuery = useQuery(
    ["balance"],
    () => {
      return axios.get(balanceApiPath);
    },
    {
      initialData: {
        data: {
          balance: 0,
        },
      },
      refetchInterval: 1000 * 2,
    }
  );
  //POST
  const postTransactions = async (trans) => {
    await axios.post("/api/campers/[camperCode]", trans);
  };
  const postTransactionsHandler = (trans) => {
    postTransactions(trans);
  };

  return (
    <CamperDetail
      camper={camper}
      camperTrans={camperTrans}
      query={query}
      balance={balanceQuery}
      onAddTransactions={postTransactionsHandler}
    />
  );
};

export default CamperOverview;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const camperId = params.camperCode;
  const accountData = await getCamper(camperId);
  const transactionData = await getCamperTransactions(camperId);
  return {
    props: {
      camper: accountData,
      camperTrans: transactionData,
    },
  };
};

// export const getStaticProps = async (context) => {
//   const { params } = context;
//   const camperId = params.camperCode;
//   const accountData = await getCamper(camperId);
//   const transactionData = await getCamperTransactions(camperId);

//   return {
//     props: {
//       camper: accountData,
//       camperTrans: transactionData,
//     },
//     revalidate: 10,
//   };
// };

// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { camperCode: "10001" } },
//       { params: { camperCode: "10002" } },
//       { params: { camperCode: "10003" } },
//       { params: { camperCode: "10004" } },
//       { params: { camperCode: "10005" } },
//       { params: { camperCode: "10006" } },
//       { params: { camperCode: "10007" } },
//       { params: { camperCode: "10008" } },
//       { params: { camperCode: "10009" } },
//     ],
//     fallback: false,
//   };
// };
