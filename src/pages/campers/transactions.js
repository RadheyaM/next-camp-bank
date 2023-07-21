import clientPromise from "../../../lib/db";
import AllTransactionsTable from "@/components/transactions/AllTransactionsTable";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import axios from "axios";

const Transactions = (props) => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth");
    }
  }, [status]);
  const query = useQuery(
    ["transactions"],
    () => {
      return axios("/api/campers/get-all-trans");
    },
    {
      initialData: {
        data: {
          data: props.allTrans,
        },
      },
    }
  );
  if (status === "authenticated") {
    return <AllTransactionsTable query={query} />;
  }
};

export default Transactions;

export const getStaticProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    const trans = await db.collection("Transactions").find().toArray();
    return {
      props: {
        allTrans: JSON.parse(JSON.stringify(trans)),
      },
    };
  } catch (e) {
    console.error(e);
  }
};
