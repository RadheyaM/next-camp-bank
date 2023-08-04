import styles from "./NewCamperForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const NewCamperForm = (props) => {
  const [accountId, setAccountId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // console.log(`first name: ${firstName}`);
  // console.log(`last name: ${firstName}`);
  // console.log(`accountId: ${accountId}`);
  // console.log(`balance: ${balance}`);

  const submitHandler = (event) => {
    event.preventDefault();
    const camperData = {
      accountId: accountId,
      firstName: firstName,
      lastName: lastName,
      startingBalance: 0,
      isStaff: false,
      dateTimeCreated: new Date(),
    };
    // console.log(
    //   `Camper data: ${camperData.accountId}, ${camperData.name}, ${camperData.startingBalance}`
    // );
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
          <TextField
            variant="standard"
            label="Camper's First Name:"
            id="firstName"
            type="text"
            required={true}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="name">Camper's Full Name</label> */}
          <TextField
            variant="standard"
            label="Camper's Last Name:"
            id="lastName"
            type="text"
            required={true}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <Button size="small" variant="contained" type="submit">
          Add New Camper
        </Button>
      </div>
    </form>
  );
};

export default NewCamperForm;
