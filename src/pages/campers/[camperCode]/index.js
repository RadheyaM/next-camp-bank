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
  const camperId = (router.query.camperCode || props.camper?.accountId || "").toString();
  // console.log("CamperId: ", camperId);
  const apiPath = `/api/campers/${camperId}/get-trans`;
  const apiBalancePath = `/api/campers/${camperId}/get-balance`;
  const apiAddBalancePath = `/api/campers/${camperId}/add-balance`;
  const postTransactionsHandler = async (trans) => {
    // console.log("trans here now: ", trans);
    setTimeout(() => {Router.replace("/")}, 2000);
    const response = await fetch(`/api/campers/${camperId}`, {
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
  const assignedQuery = useQuery(
    ["assignedCampers"],
    () => {
      return axios(`/api/campers/${camperId}/get-assigned`);
    },
    {
      initialData: {
        data: {
          data: props.assignedCampers,
        },
      },
    }
  );
  if (status === "authenticated") {
    return (
      <Paper elevation={12} sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        gap: "1.5rem",
        padding: { xs: "1rem", md: "2rem" },
        backgroundColor: "#f8f8ff"}}
    >
        <CamperDetail
          trans={props.trans}
          camper={props.camper}
          assignedCampers={assignedQuery}
          query={query}
          balance={balanceQuery}
          onAddTransactions={postTransactionsHandler}
        />
      </Paper>
    );
  }
};

export default CamperOverview;

export const getServerSideProps = async (context) => {
  const camperId = context.query.camperCode || context.params?.camperCode;
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Campers");
  const trans = db.collection("Transactions");
  const camper = await col.findOne({ accountId: camperId });
  const camperTrans = await trans.find({ accountId: camperId }).toArray();
  const camperDetailsCol = db.collection("CamperDetails");
  const assignedCampers = await camperDetailsCol.find({
    $or: [
      { accountQRCode: camperId },
      { linkedQRCode: camperId }
    ]
  }).toArray();
  return {
    props: {
      camper: JSON.parse(JSON.stringify(camper || null)),
      trans: JSON.parse(JSON.stringify(camperTrans)),
      assignedCampers: JSON.parse(JSON.stringify(assignedCampers)),
    },
  };
};
