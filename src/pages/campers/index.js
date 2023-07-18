import AllCampersTable from "@/components/campers/AllCampersTable";
import Card from "@/components/UI/Card";
import clientPromise from "../../../lib/db";

const Campers = (props) => {
  console.log(props.campers)
  
  return (
    <Card>
      <AllCampersTable campers={props.campers}/>
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