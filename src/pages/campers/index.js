import AllCampersTable from "@/components/campers/AllCampersTable";
import { getAllCampers } from "../api/campers";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
  return <AllCampersTable campers={props.campers} query={query}/>;
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
