import CamperDetail from "@/components/campers/CamperDetail";
import clientPromise from "../../../../lib/db";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import Paper from '@mui/material/Paper';
import transactionBalance from "../../../../lib/helpers";

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
    try {
      const response = await fetch(`/api/campers/${camperId}`, {
        method: "POST",
        body: JSON.stringify(trans),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const msg = errData.message || "Failed to add transactions";
        Router.replace(`/?error=true&msg=${encodeURIComponent(msg)}`);
        return;
      }

      const addBalance = await fetch(apiAddBalancePath, {
        method: "POST",
        body: JSON.stringify(trans),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!addBalance.ok) {
        const errData = await addBalance.json().catch(() => ({}));
        const msg = errData.message || "Failed to update balance";
        Router.replace(`/?error=true&msg=${encodeURIComponent(msg)}`);
        return;
      }

      Router.replace("/?success=true");
    } catch (err) {
      console.error("Transaction API error:", err);
      Router.replace(`/?error=true&msg=${encodeURIComponent(err.message || "Network error occurred")}`);
    }
  };

  const queryClient = useQueryClient();

  // Instant cache synchronization with fresh SSR props
  useEffect(() => {
    if (props.trans && camperId) {
      // Direct cache seeding for transactions
      queryClient.setQueryData(["transactions", camperId], {
        data: {
          data: props.trans
        }
      });

      // Direct cache seeding for calculated balance
      const deposits = (props.trans || []).filter(t => t.type === "Deposit");
      const payments = (props.trans || []).filter(t => ["Payment", "Adjustment"].includes(t.type));
      const initialBalanceVal = transactionBalance(deposits, payments);

      queryClient.setQueryData(["balance", camperId], {
        data: {
          data: initialBalanceVal
        }
      });
    }
  }, [props.trans, camperId, queryClient]);

  useEffect(() => {
    if (props.assignedCampers && camperId) {
      queryClient.setQueryData(["assignedCampers", camperId], {
        data: {
          data: props.assignedCampers
        }
      });
    }
  }, [props.assignedCampers, camperId, queryClient]);

  // Calculate initial balance from SSR props
  const deposits = (props.trans || []).filter(t => t.type === "Deposit");
  const payments = (props.trans || []).filter(t => ["Payment", "Adjustment"].includes(t.type));
  const initialBalanceVal = transactionBalance(deposits, payments);

  const query = useQuery(
    ["transactions", camperId],
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
    ["balance", camperId],
    () => {
      return axios(apiBalancePath);
    },
    {
      initialData: {
        data: {
          data: initialBalanceVal,
        },
      },
    }
  );
  const assignedQuery = useQuery(
    ["assignedCampers", camperId],
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
    const scannedCode = router.query.scannedCode;
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
          scannedCode={scannedCode}
        />
      </Paper>
    );
  }
};

export default CamperOverview;

export const getServerSideProps = async (context) => {
  const camperId = (context.query.camperCode || context.params?.camperCode || "").toString().trim();
  const client = await clientPromise;
  const db = client.db("Campers");
  const camperDetailsCol = db.collection("CamperDetails");

  // If this requested ID is actually assigned as a secondary linked account, perform a server-side redirect
  const requestedDetail = await camperDetailsCol.findOne({ accountQRCode: camperId });
  if (requestedDetail && requestedDetail.linkedQRCode && requestedDetail.linkedQRCode.trim() !== "") {
    const primaryCode = requestedDetail.linkedQRCode.trim();
    console.log(`Server-side Redirect: Resolving secondary account ${camperId} to primary ${primaryCode}`);
    return {
      redirect: {
        destination: `/campers/${primaryCode}?scannedCode=${camperId}`,
        permanent: false,
      },
    };
  }

  const col = db.collection("Campers");
  const trans = db.collection("Transactions");
  const camper = await col.findOne({ accountId: camperId });
  const camperTrans = await trans.find({ accountId: camperId }).toArray();
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
