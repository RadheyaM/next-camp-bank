import AllCampersTable from "@/components/campers/AllCampersTable";
import { getAllCampers } from "../api/campers";

const Campers = (props) => {
  return <AllCampersTable campers={props.campers} />;
};

export default Campers;

export const getStaticProps = async (context) => {
    const allCampers = await getAllCampers();

  return {
    props: {
      campers: allCampers
    }
  }
};
