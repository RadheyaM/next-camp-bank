const TransactionRow = (props) => {
  const { _id, timeStamp, category, type, amount } = props.trans;
  
  const humanTime = new Date(timeStamp).toLocaleTimeString();
  const humanDate = new Date(timeStamp).toLocaleDateString();

  return (
    <tr>
      <td>{_id}</td>
      <td>{humanDate + " " + humanTime}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>€{amount}</td>
    </tr>
  );
};

export default TransactionRow;
