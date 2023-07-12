import styles from "./NewCamperForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef } from "react";

const NewCamperForm = (props) => {
  const accountId = useRef();
  const name = useRef();
  const balance = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAccountId = accountId.current.value;
    const enteredName = name.current.value;
    const enteredStartingBalance = name.current.value;
    console.log(`Name: ${enteredName}`)
    console.log(`ID: ${enteredAccountId}`)
    console.log(`Balance: ${enteredStartingBalance}`)
    const camperData = {
      accountId: enteredAccountId,
      name: enteredName,
      startingBalance: enteredStartingBalance,
      dateTimeCreated: new Date(),
    };
    // console.log("CamperData: ", camperData)
    props.onAdd(camperData);
    // redirect to new customer account overview...
  };

  return (
    <form onSubmit={submitHandler} className={styles.newCamperForm}>
      <h3>ADD A NEW CAMPER</h3>
      <hr />
      <div className={styles.inputs}>
        <div>
          {/* <label htmlFor="accountId">Account Code</label> */}
          <TextField
            id="accountId"
            variant="standard"
            label="New Account Code:"
            type="text"
            required={true}
            ref={accountId}
          />
        </div>
        <div>
          {/* <label htmlFor="name">Camper's Full Name</label> */}
          <TextField variant="standard" label="New Camper's Full Name:" id="name" type="text" required={true} ref={name}/>
        </div>
        <div>
          {/* <label htmlFor="startingBalance">Starting Balance (if any)</label> */}
          <TextField
            label="Starting Balance:"
            variant="standard"
            id="startingBalance"
            type="text"
            ref={balance}
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <Button variant="contained" type="submit">
          Add New Camper
        </Button>
      </div>
    </form>
  );
};

export default NewCamperForm;
