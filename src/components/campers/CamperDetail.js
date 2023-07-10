import AccountSummary from "../overview/AccountSummary"

const CamperDetail = props => {
  return (
    <AccountSummary camper={props.camper} camperTrans={props.camperTrans}/>
  )
}

export default CamperDetail