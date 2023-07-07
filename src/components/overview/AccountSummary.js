import { Fragment } from "react"

import TransactionsTable from "./TransactionTable"
import Card from "../UI/Card"

const AccountSummary = props => {
  const { camper } = props
  return (
    <Card>
      <h2>Account Details</h2>
      <h3>{camper.accountId}</h3>
      <h3>{camper.name}</h3>
      <h3>{camper.startingBalance.$numberDecimal}</h3>
      <TransactionsTable />
    </Card>
  )
}

export default AccountSummary