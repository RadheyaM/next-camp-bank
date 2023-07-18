import AllCampersTable from "@/components/campers/AllCampersTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/UI/Card";
import clientPromise from "../../../lib/db";

const Campers = (props) => {
  console.log(props.campers)
  // const query = useQuery(
  //   ["campers"],
  //   () => {
  //     return axios("api/campers");
  //   },
  //   {
  //     initialData: {
  //       data: {
  //         campers: props.campers
  //       }
  //     },
  //   }
  // );
  // console.log(query)
  return (
    <Card>
      <AllCampersTable campers={props.campers}/>
    </Card>
  );
};  

export default Campers;

export const getStaticProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("Campers")

    const campers = await db.collection("Campers").find().toArray();
    return {
      props: {
        campers: JSON.parse(JSON.stringify(campers))
      }
    }
  } catch (e) {
    console.error(e);
  }
}