import CamperRow from './CamperRow';
import Table from '../UI/Table';


const AllCampersTable = props => {
  const { campers, query } = props
  const apiData = query.data.data.campers
  // console.log("from AllCampers", campers)
  // console.log("from AllCampers TRans", camperTrans)
  return (
    <Table>
      <caption>
        <h2>All Campers</h2>
      </caption>
      <thead>
        <tr>
          <th>Account Id</th>
          <th>Name</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {apiData.map((camper) => (
          <CamperRow key={camper.accountId} camper={camper}/>
        ))}
      </tbody>
    </Table>
  );
};

export default AllCampersTable
