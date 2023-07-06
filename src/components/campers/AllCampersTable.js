import styles from './AllCampersTable.module.css'

const AllCampersTable = () => {
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
        <tr>
          <td>10001</td>
          <td>Billy Bob McDoogle</td>
          <td>€50.00</td>
        </tr>
        <tr>
          <td>10002</td>
          <td>Boaty McBoatFace</td>
          <td>€25.00</td>
        </tr>
        <tr>
          <td>10003</td>
          <td>Grainne Griffin</td>
          <td>€11.75</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AllCampersTable
