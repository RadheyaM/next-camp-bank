import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./ScanCamperCode.module.css";
import Card from "../UI/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ScanCamperCode = () => {
  const router = useRouter();
  const [enteredCode, setEnteredCode] = useState("");
  const codeInputHandler = (event) => {
    setEnteredCode(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    router.push(`/campers/${enteredCode}`);
  };
  console.log(enteredCode);
  return (
    <Card>
      <form onSubmit={submitHandler} className={styles.enterCodeForm}>
        <div className={styles.inputWrapper}>
          <TextField
            onChange={codeInputHandler}
            id="code-input"
            label="Scan or Enter ID manually..."
            variant="standard"
            autoFocus={true}
          />
          {/* <label htmlFor='code-input'>Scan or Enter Code Manually</label>
          <input autoFocus={true} id='code-input' className={styles.codeInput} type="text" onChange={codeInputHandler}/> */}
        </div>
        <div>
          <Button variant="contained" type="submit">
            Find
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ScanCamperCode;
