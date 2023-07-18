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
      {/* <div>
        <h1>Top 20 Movies of All Time</h1>
        <p>
            <small>(According to Metacritic)</small>
        </p>
        <ul>
            {props.campers.map((camper) => (
                <li>
                    <h2>{camper.name}</h2>
                    <h3>{camper.accoutId}</h3>
                    <p>{camper.startingBalance}</p>
                </li>
            ))}
        </ul>
      </div> */}
      {/* <AllCampersTable /> */}
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