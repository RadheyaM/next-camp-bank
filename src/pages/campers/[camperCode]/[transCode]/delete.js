import { useRouter } from "next/router";

const deleteTransaction = () => {
  const router = useRouter();
  const code = router.query.transCode
  

  return <h1>Delete {code}</h1>
};

export default deleteTransaction;