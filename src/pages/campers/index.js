import AllCampersTable from "@/components/campers/AllCampersTable";
import Card from "@/components/UI/Card";
import clientPromise from "../../../lib/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Paper from '@mui/material/Paper';
import { allTransactionBalances } from "../../../lib/helpers";
const converter = require('json-2-csv')

const Campers = (props) => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth");
    }
  }, [status]);
  // const query = useQuery(
  //   ["campers"],
  //   () => {
  //     return axios("/api/campers/addInitialData");
  //   },
  //   {
  //     initialData: {
  //       data: {
  //         data: props.campers,
  //       },
  //     },
  //   }
  // );
  const query = useQuery(
    ["campers"],
    () => {
      return axios("/api/campers/get");
    },
    {
      initialData: {
        data: {
          data: props.campers,
        },
      },
    }
  );
  const csvDataQuery = useQuery(
    ["allCamperData"],
    () => {
      return axios("/api/campers/getAllCamperBalances");
    },
    {
      initialData: {
        data: {
          data: props.allCampers,
        },
      },
    }
  )
  

  // console.log(query.data.data.data);
  if (status === "authenticated") {
    return (
      <Paper elevation={6} sx={{width: "95%", display: "flex", padding: "2rem", backgroundColor: "#f8f8ff"}}>
        <Card>
          <AllCampersTable campers={props.campers} query={query} csvData={csvDataQuery}/>
        </Card>
      </Paper>
      
    );
  }
};

export default Campers;

export const getStaticProps = async () => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Campers");
  const campers = await col.find({}).toArray();
  const transCol = db.collection("Transactions");
  const camperCol = db.collection("Campers")
  const deposits = await col.find({type: "Deposit"}).toArray();
  const payments = await col.find({type: "Payment"}).toArray();
  const camperIds = await camperCol.find({}).toArray();
  const balanceData = allTransactionBalances(deposits, payments, camperIds)
  const allCampers = converter.json2csv(balanceData)
  return {
    props: {
      campers: JSON.parse(JSON.stringify(campers)),
      allCampers: JSON.parse(JSON.stringify(allCampers))
    },
  };
};
