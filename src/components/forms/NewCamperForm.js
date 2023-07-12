import { useState } from 'react';
import styles from './NewCamperForm.module.css'
import Button from '@mui/material/Button'

const NewCamperForm = props => {
  const [enteredAccountId, setEnteredAccountId] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredStartingBalance, setEnteredStartingBalance] = useState("");
  const inputHandler = (identifier, event) => {
    if (identifier === "accountId") {
      setEnteredAccountId(event.target.value);
      // console.log(event.target.value);
    } else if (identifier === "name") {
      setEnteredName(event.target.value);
      // console.log(event.target.value);
    } else {
      setEnteredStartingBalance(event.target.value)
      // console.log(event.target.value);
    }
  };
  
  const submitHandler = (event) => {
    event.preventDefault();
    const camperData = {
      accountId: enteredAccountId,
      name: enteredName,
      startingBalance: enteredStartingBalance
    }
    // console.log("CamperData: ", camperData)
    props.onAdd(camperData);
    setEnteredAccountId("")
    setEnteredName("")
    setEnteredStartingBalance("")
    // redirect to new customer account overview...
  }


  return (
    <form onSubmit={submitHandler} className={styles.newCamperForm}>
      <h2>Add A Camper</h2>
      <div className={styles.inputs}>
        <div>
          <label htmlFor="accountId">Account Code</label>
          <input
            id="accountId"
            type="text"
            required={true}
            autoFocus={true}
            onChange={(event) => {inputHandler("accountId", event)}}
          />
        </div>
        <div>
          <label htmlFor="name">Camper's Full Name</label>
          <input
            id="name"
            type="text"
            required={true}
            onChange={(event) => {inputHandler("name", event)}}
          />
        </div>
        <div>
          <label htmlFor="startingBalance">Starting Balance (if any)</label>
          <input
            id="startingBalance"
            type="text"
            placeholder='0.00'
            onChange={(event) => {inputHandler("startingBalance", event)}}
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <Button variant="contained" type="submit">Add New Camper</Button>
      </div>
    </form>
  )
};

export default NewCamperForm;