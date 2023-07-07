
const TransactionRow = props => {
  const { _id, dateTimeStamp, category, type, amount } = props.trans
  console.log(_id)
  return (
   <tr>
      <td>{_id}</td>
      <td>{dateTimeStamp}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>€{amount.$numberDecimal}</td>
    </tr>
  )
};

export default TransactionRow;