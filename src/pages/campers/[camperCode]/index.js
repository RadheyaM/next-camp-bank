import CamperDetail from "@/components/campers/CamperDetail";
import clientPromise from "../../../../lib/db";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import Paper from '@mui/material/Paper';

const CamperOverview = (props) => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth");
    }
  }, [status]);
  const router = useRouter();
  const camperId = router.query.camperCode.toString();
  // console.log("CamperId: ", camperId);
  const apiPath = `/api/campers/${camperId}/get-trans`;
  const apiBalancePath = `/api/campers/${camperId}/get-balance`;
  const apiAddBalancePath = `/api/campers/${camperId}/add-balance`;
  const postTransactionsHandler = async (trans) => {
    // console.log("trans here now: ", trans);
    setTimeout(() => {Router.replace("/")}, 2000);
    const response = await fetch("/api/campers/[campersCode]", {
      method: "POST",
      body: JSON.stringify(trans),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const addBalance = await fetch(apiAddBalancePath, {
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
  const balanceQuery = useQuery(["balance"], () => {
    return axios(apiBalancePath);
  });
  console.log("query:", query.data.data.data);
  if (status === "authenticated") {
    return (
      <Paper elevation={12} sx={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "6rem",
        backgroundColor: "#f8f8ff"}}
    >
        <CamperDetail
          trans={props.trans}
          camper={props.camper}
          query={query}
          balance={balanceQuery}
          onAddTransactions={postTransactionsHandler}
        />
      </Paper>
    );
  }
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
