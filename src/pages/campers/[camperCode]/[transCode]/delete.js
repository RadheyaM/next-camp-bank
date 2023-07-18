import { useRouter } from "next/router";
import { getTransaction } from "@/pages/api/campers/get";

const deleteTransaction = props => {
  const router = useRouter();
  const code = router.query.transCode;

  return <h1>Delete {code}?</h1>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const transId = params.transCode;
  console.log("Your Trans ID: ", transId);
  const data = await getTransaction(transId);
  console.log("your data:", data)
  return {
    props: {
      trans: data,
    },
  };
};

export default deleteTransaction;
