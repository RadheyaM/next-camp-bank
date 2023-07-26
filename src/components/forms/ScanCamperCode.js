import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./ScanCamperCode.module.css";
import Card from "../UI/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { euro } from "../../../lib/helpers";

const ScanCamperCode = () => {
  const [alert, setAlert] = useState(true);
  let localParsed;
  let name;
  let balance = 0;
  let dep = 0;
  let book = 0;
  let tuck = 0;
  let withdrawn = 0;
  if (localStorage.getItem("Alert")) {
    const local = localStorage.getItem("Alert");
    localParsed = JSON.parse(local);
    name = localParsed[5].name;
    if (localParsed[4].balance) {
      balance = Number(localParsed[4].balance);
    }
    if (localParsed[0].amount) {
      dep = localParsed[0].amount;
    }
    if (localParsed[1].amount) {
      book = localParsed[1].book;
    }
    if (localParsed[2].amount) {
      tuck = localParsed[2].amount;
    }
    if (localParsed[3].amount) {
      withdrawn = localParsed[3].amount;
    }
    console.log(name);
  }
  const router = useRouter();
  const [enteredCode, setEnteredCode] = useState("");
  const codeInputHandler = (event) => {
    setEnteredCode(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    router.push(`/campers/${enteredCode}`);
    setAlert(false);
    if (localStorage.get("Alert")) {
      localStorage.removeItem("Alert");
    }
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
        <div className={styles.findBtnDiv}>
          <Button size="large" variant="contained" type="submit">
            Find
          </Button>
        </div>
        {alert && (
          <Stack sx={{ width: "60%" }} spacing={5}>
            <Alert
              severity="info"
              onClose={() => {
                setAlert(false);
              }}
            >
              <AlertTitle>
                Last Transaction:<strong>&nbsp;{name}&nbsp;|&nbsp;Current Balance:&nbsp;{euro.format(balance)}</strong>
              </AlertTitle>
              Dep:&nbsp;€{dep}&nbsp;|&nbsp;Book:&nbsp;€{book}&nbsp;|&nbsp;Tuck:&nbsp;€{tuck}&nbsp;
              |&nbsp;Withdrawal&nbsp;€{withdrawn}
            </Alert>
          </Stack>
        )}
      </form>
    </Card>
  );
};

export default ScanCamperCode;
