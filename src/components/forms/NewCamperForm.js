import styles from './NewCamperForm.module.css'

const NewCamperForm = props => {
  return (
    <form className={styles.newCamperForm}>
      <h2>Add A Camper</h2>
      <div className={styles.inputs}>
        <div>
          <label htmlFor="accountCode">Account Code</label>
          <input
            id="accountCode"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="name">Camper's Full Name</label>
          <input
            id="name"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="startBalance">Starting Balance</label>
          <input
            id="startBalance"
            type="number"
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <button type="submit">Add New Camper</button>
      </div>
    </form>
  )
};

export default NewCamperForm;