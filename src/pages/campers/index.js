import AllCampersTable from "@/components/campers/AllCampersTable";
import Card from "@/components/UI/Card";
import clientPromise from "../../../lib/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

const Campers = (props) => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth");
    }
  }, [status]);
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
  console.log(query.data.data.data);
  if (status === "authenticated") {
    return (
      <Card>
        <AllCampersTable campers={props.campers} query={query} />
      </Card>
    );
  }
};

export default Campers;

export const getStaticProps = async () => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Campers");
  const campers = await col.find({}).toArray();
  return {
    props: {
      campers: JSON.parse(JSON.stringify(campers)),
    },
  };
};
