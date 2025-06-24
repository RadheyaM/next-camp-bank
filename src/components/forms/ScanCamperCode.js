import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ScanCamperCode.module.css";
import Card from "../UI/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';


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
    <Paper elevation={6} sx={{width: "95%", height: "100vh", display: "flex", padding: "5rem", backgroundColor: "#f8f8ff"}}>
      <Card sx={{width: "100%"}}>
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
            <Stack sx={{ width: "30%", textAlign: "center" }} spacing={5}>
              <Alert
                severity="info"
                onClose={() => {
                  setAlert(false);
                }}
              >
                <AlertTitle>
                  <Link href="/campers/transactions" replace>
                    Recent Transactions
                  </Link>
                </AlertTitle>
              </Alert>
            </Stack>
        </form>
      </Card>
    </Paper>
  );
};

export default ScanCamperCode;
