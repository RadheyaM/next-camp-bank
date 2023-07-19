import CamperDetail from "@/components/campers/CamperDetail";
import clientPromise from "../../../../lib/db";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const CamperOverview = (props) => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const router = useRouter();
  const camperId = router.query.camperCode.toString();
  console.log("CamperId: ", camperId);
  const apiPath = `/api/campers/${camperId}/get-trans`;
  const apiBalancePath = `/api/campers/${camperId}/get-balance`;
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
  const query = useQuery(
    ["transactions"],
    () => {
      return axios(apiPath);
    },
    {
      initialData: {
        data: {
          data: props.trans,
        },
      },
    }
  );
  const balanceQuery = useQuery(
    ["balance"],
    () => {
      return axios(apiBalancePath);
    }
  );
  console.log("query:", query.data.data.data);

  return (
    <CamperDetail
      trans={props.trans}
      camper={props.camper}
      query={query}
      balance={balanceQuery}
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
