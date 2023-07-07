import CamperRow from './CamperRow';
import Table from '../UI/Table';


const AllCampersTable = props => {
  const { campers, camperTrans } = props
  console.log("from AllCampers", campers)
  console.log("from AllCampers TRans", camperTrans)
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
        {campers.map((camper) => (
          <CamperRow key={camper.accountId} camper={camper}/>
        ))}
      </tbody>
    </Table>
  );
};

export default AllCampersTable
