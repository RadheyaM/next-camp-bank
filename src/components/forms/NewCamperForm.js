import styles from "./NewCamperForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const NewCamperForm = (props) => {
  const [accountId, setAccountId] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance ] = useState("");

  console.log(`name: ${name}`);
  console.log(`accountId: ${accountId}`);
  console.log(`balance: ${balance}`);

  const submitHandler = (event) => {
    event.preventDefault();
    const camperData = {
      accountId: accountId,
      name: name,
      startingBalance: balance,
      dateTimeCreated: new Date(),
    };
    console.log(`Camper data: ${camperData.accountId}, ${camperData.name}, ${camperData.startingBalance}`)
    props.onAdd(camperData);
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
            onChange={(e) => setAccountId(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="name">Camper's Full Name</label> */}
          <TextField variant="standard" label="New Camper's Full Name:" id="name" type="text" required={true} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          {/* <label htmlFor="startingBalance">Starting Balance (if any)</label> */}
          <TextField
            label="Starting Balance:"
            variant="standard"
            id="startingBalance"
            type="text"
            onChange={(e) => setBalance(e.target.value)}
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
