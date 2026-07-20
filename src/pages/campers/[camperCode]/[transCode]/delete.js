import { useRouter } from "next/router";
import clientPromise from "../../../../../lib/db";
import { ObjectId } from "mongodb";

const deleteTransaction = props => {
  const router = useRouter();
  const code = router.query.transCode;

  return (
    <div style={{ textAlign: "center", padding: "4rem", color: "#1d3557", minHeight: "100vh", backgroundColor: "#f8f8ff" }}>
      <h1>Delete Transaction</h1>
      <p>Are you sure you want to delete transaction <strong>{code}</strong>?</p>
      <p style={{ fontStyle: "italic", color: "#666" }}>Dynamic transaction deletion flows are under development.</p>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const transId = params.transCode;
  console.log("Your Trans ID to delete: ", transId);

  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    const col = db.collection("Transactions");
    
    let objId;
    try {
      objId = new ObjectId(transId);
    } catch (e) {
      return {
        notFound: true
      };
    }

    const data = await col.findOne({ _id: objId });
    if (!data) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        trans: JSON.parse(JSON.stringify(data)),
      },
    };
  } catch (error) {
    console.error("Error fetching transaction for deletion:", error);
    return {
      props: {
        trans: null,
      },
    };
  }
};

export default deleteTransaction;
