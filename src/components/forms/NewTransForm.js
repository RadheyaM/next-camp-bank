import Card from "../UI/Card";
import styles from './NewTransForm.module.css'

const NewTransForm = props => {
  return (
    <form className={styles.newTransForm}>
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
    </form>
  )
};

export default NewTransForm;