import AllCampersTable from "@/components/campers/AllCampersTable";
import Card from "@/components/UI/Card";
import clientPromise from "../../../lib/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Campers = (props) => {
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
  console.log(query.data.data.data)
  return (
    <Card>
      <AllCampersTable campers={props.campers} query={query}/>
    </Card>
  );
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
    }
  }

}