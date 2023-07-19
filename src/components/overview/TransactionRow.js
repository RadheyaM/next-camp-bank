const TransactionRow = (props) => {
  const { _id, accountId, timeStamp, category, type, amount} = props.tran;

  const humanTime = new Date(timeStamp).toLocaleTimeString();
  const humanDate = new Date(timeStamp).toLocaleDateString();
  const deletePath = `/campers/${accountId}/${_id}/delete`

  return (
    <tr>
      <td>{_id}</td>
      <td suppressHydrationWarning>{humanDate + " " + humanTime}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>€{amount}</td>
    </tr>
  );
};

export default TransactionRow;
