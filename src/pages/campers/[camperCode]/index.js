import CamperDetail from "@/components/campers/CamperDetail";
import { getCamper } from "../../api/campers/[camperCode]";

const CamperOverview = (props) => {
  const { camper } = props;
  // const camperId = router.query.camperCode.toString();
  // const postTransactions = async (trans) => {
  //   await axios.post("/api/campers/[camperCode]", trans);
  // };
  const postTransactionsHandler = (trans) => {
    postTransactions(trans);
  };

  return (
    <CamperDetail
      camper={camper}
      onAddTransactions={postTransactionsHandler}
    />
  );
};

export default CamperOverview;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const camperId = params.camperCode;
  try {
    //simply call the function which can also be called by API fetch.
    const accountData = await getCamper(camperId);
    console.log(accountData)
    return {
      props: {
        camper: accountData,
      },
    }
  } catch (error) {
    console.error(error);
  }
};