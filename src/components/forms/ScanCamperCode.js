import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './ScanCamperCode.module.css'
import Card from '../UI/Card'

const ScanCamperCode = () => {
  const router = useRouter();
  const [enteredCode, setEnteredCode] = useState("");
  const codeInputHandler = (event) => {
    setEnteredCode(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault();
    router.push(`/campers/${enteredCode}`);
  }
  console.log(enteredCode)
  return(
    <Card>
      <form onSubmit={submitHandler} className={styles.enterCodeForm}>
        <div className={styles.inputWrapper}>
          <label htmlFor='code-input'>Scan or Enter Code Manually</label>
          <input autoFocus={true} id='code-input' className={styles.codeInput} type="text" onChange={codeInputHandler}/>
        </div>
        <div>
          <button className={styles.submitBtn} type="submit">Find</button>
        </div>
      </form>
    </Card>
  )
}

export default ScanCamperCode


