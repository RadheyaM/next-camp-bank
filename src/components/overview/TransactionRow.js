const TransactionRow = (props) => {
  const { _id, dateTimeStamp, category, type, amount } = props.trans;
  let readableDate = new Date(dateTimeStamp).toLocaleString();
  return (
    <tr>
      <td>{_id}</td>
      <td>{readableDate}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>€{amount}</td>
    </tr>
  );
};

export default TransactionRow;
