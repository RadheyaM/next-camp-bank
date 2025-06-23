import Card from "@/components/UI/Card";
import clientPromise from "../../../lib/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { addDay } from "../../../lib/helpers";
import SummaryComponent from "@/components/transactions/SummaryComponent";

const Summary = (props) => {
    const {status, data} = useSession();
    useEffect(() => {
        if (status === "unauthenticated") {
        Router.replace("/auth");
        }
    }, [status]);
    const query = useQuery(
        ["campers"],
        () => {
        return axios("/api/campers/get-summary-data");
        },
        {
        initialData: {
            data: {
            data: props.data,
            },
        },
        }
    );
    // console.log(query.data.data.data);
    if (status === "authenticated") {
        return (
        <Card>
            <SummaryComponent data={props.data} query={query} />
        </Card>
        );
    }
};

export default Summary;

export const getStaticProps = async () => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Transactions");
  const trans = await col.find({}).toArray();
  const dayAdded = addDay(trans)
  return {
    props: {
      data: JSON.parse(JSON.stringify(dayAdded)),
    },
  };
};
