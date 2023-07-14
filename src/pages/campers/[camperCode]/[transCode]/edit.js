import EditCamperTrans from "@/components/forms/EditCamperTrans";
import { getTransaction } from "@/pages/api/transactions/get";

const edit = (props) => {
  return <EditCamperTrans trans={props.trans}/>
};

// export const getServerSideProps = async(context) => {
//   const { params } = context;
//   const transId = params.transCode;
//   const transData = await getTransaction(transId);
//   return {
//     props: {
//       trans: transData
//     }
//   }
// }

export default edit;
