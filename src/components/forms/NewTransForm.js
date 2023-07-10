import Card from "../UI/Card";
import styles from './NewTransForm.module.css'

const NewTransForm = props => {
  return (
    <form className={styles.newTransForm}>
      <h2>Create Transactions</h2>
      <p>Leave fields blank where not applicable, e.g. no withdrawal, leave blank...</p>
      <p>Always enter positive transaction values.</p>
      <div className={styles.inputs}>
        <div>
          <label htmlFor="deposit">Deposit</label>
          <input type="number" id="deposit" />
        </div>
        <div>
          <label type="number" htmlFor="book">Book</label>
          <input type="number" id="book"/>
        </div>
        <div>
          <label htmlFor="tuckshop">Tuckshop</label>
          <input type="number" id="tuckshop"/>
        </div>
        <div>
          <label htmlFor="withdraw">Withdraw</label>
          <input type="number" id="withdraw"/>
        </div>
      </div>
      <div className={styles.submitBtn}>
        <button type="submit">Add Transaction(s)</button>
      </div>
    </form>
  )
};

export default NewTransForm;