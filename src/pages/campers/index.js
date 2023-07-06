import styles from '../../styles/campersIndex.module.css'

const Campers = () => {
  return (
    <div>
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
    </div>
  );
};

export default Campers;
