import Link from 'next/link';

const CamperRow = props => {
  const { accountId, name, balance } = props.camper
  return (
    <tr>
      <td><Link href="/">{accountId}</Link></td>
      <td>{name}</td>
      <td>{balance}</td>
    </tr>
  )
}

export default CamperRow