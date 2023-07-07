import Card from "../UI/Card"
import AccountSummary from "../overview/AccountSummary"

const CamperDetail = props => {
  return (
    <AccountSummary camper={props.camper}/>
  )
}

export default CamperDetail