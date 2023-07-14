import styles from "./EditCamperTrans.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditCamperTrans = (props) => {
  console.log(props.trans)
  const editHandler = () => {};
  return (
    <form onSubmit={editHandler} className={styles.newCamperForm}>
      <h3>Edit Camper Transaction: </h3>
      {/* <p>{_id}</p>
      <p>{accountId}</p>
      <p>{name}</p>
      <p>{type}</p>
      <p>{category}</p>
      <p>{amount}</p>
      <p>{timeStamp}</p> */}
      <hr />
      <div className={styles.inputs}>
        <div>
          {/* <label htmlFor="accountId">Account Code</label> */}
          <TextField
            id="accountId"
            variant="standard"
            label="New Account Code:"
            type="text"
          />
        </div>
        <div>
          {/* <label htmlFor="name">Camper's Full Name</label> */}
          <TextField
            variant="standard"
            label="New Camper's Full Name:"
            id="name"
            type="text"
          />
        </div>
        <div>
          {/* <label htmlFor="startingBalance">Starting Balance (if any)</label> */}
          <TextField
            label="Starting Balance:"
            variant="standard"
            id="startingBalance"
            type="text"
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <Button variant="contained" type="submit">
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditCamperTrans;
