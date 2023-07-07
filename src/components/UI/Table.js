import styles from './Table.module.css'

const Table = props => {
  const tableClasses = `${styles.myTable} ${props.className}`
  return (
    <table className={tableClasses}>{props.children}</table>
  )
}

export default Table