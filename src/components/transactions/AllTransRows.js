const AllTransRows = props => {
  const { accountId, _id, dateTimeStamp, type, category, amount } = props.trans
  return (
    <tr>
      <td>{accountId}</td>
      <td>{_id}</td>
      <td>{dateTimeStamp}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>{amount.$numberDecimal}</td>
    </tr>
  )
}

export default AllTransRows