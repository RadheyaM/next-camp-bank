import styles from './AllCampersTable.module.css'
import CamperRow from './CamperRow';


const AllCampersTable = props => {
  const { campers } = props
  return (
    <table className={styles.allCampersTable}>
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
        {posts.map((camper) => (
          <CamperRow />
        ))}
      </tbody>
    </table>
  );
};

export default AllCampersTable
