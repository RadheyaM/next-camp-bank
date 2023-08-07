import styles from "./NewCamperForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { createUser } from "../auth/auth-form";

const NewUserForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [passError, setPassError] = useState("");

  const submitHandler = (event) => {
    setPassError(false);
    event.preventDefault();
    if (password !== passwordConf) {
      setPassError(true);
      return;
    }
    createUser(username, passwordConf);
    setUsername("");
    setPassword("");
    setPasswordConf("");
  };  

  return (
    <form onSubmit={submitHandler} className={styles.newCamperForm}>
      <h3>ADD NEW USER</h3>
      <hr />
      <div className={styles.inputs}>
        <div>
          <TextField
            id="username"
            variant="standard"
            label="New Username"
            type="text"
            required={true}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            label="Password: "
            id="password"
            type="text"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            label="Confirm Password: "
            id="passwordConf"
            type="text"
            required={true}
            onChange={(e) => setPasswordConf(e.target.value)}
            value={passwordConf}
          />
          {passError && (
            <p className={styles.error}>passwords need to match.</p>
          )}
        </div>
      </div>
      <div className={styles.submitBtn}>
        <Button size="small" variant="outlined" type="submit">
          Add New User
        </Button>
      </div>
    </form>
  );
};

export default NewUserForm;
