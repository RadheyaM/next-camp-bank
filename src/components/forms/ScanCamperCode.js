import styles from './ScanCamperCode.module.css'

const ScanCamperCode = () => {
  return(
    <form className={styles.enterCodeForm}>
      <div className={styles.inputWrapper}>
        <label htmlFor='code-input'>Scan or Enter Code Manually</label>
        <input id='code-input' className={styles.codeInput} type="number"/>
      </div>
      <div className={styles.inputWrapper}>
        <button type="submit">Find</button>
        <div className={styles.clearWrapper}><button>Clear</button></div>
      </div>
    </form>
  )
}

export default ScanCamperCode


