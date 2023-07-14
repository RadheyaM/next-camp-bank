import AllCampersTable from "@/components/campers/AllCampersTable";
import { getAllCampers } from "../api/campers";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import Card from "@/components/UI/Card";
import { Button } from "@mui/material";

const Campers = (props) => {
  const query = useQuery(
    ["campers"],
    () => {
      return axios("/api/campers");
    },
    {
      initialData: {
        data: {
          campers: props.campers
        }
      },
    }
  );
  // console.log(props.campers, query)
  return (
    <Card>
      <form>
        <TextField label="Name Search" variant="standard" type="text"/>
        <div><Button variant="contained">Find</Button></div>
      </form>
      <AllCampersTable campers={props.campers} query={query}/>
    </Card>
  );
};  

export default Campers;

export const getStaticProps = async (context) => {
  const campers = await getAllCampers();
  return {
    props: {
      campers: campers,
    },
    revalidate: 60,
  };
};
