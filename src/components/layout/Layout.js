import { Fragment } from "react"
import MainNavigation from "./MainNavigation"
import Card from "../UI/Card"

const Layout = props => {
  return (
    <Fragment>
      <Card>
        <MainNavigation />
        <main>{props.children}</main>
      </Card>
    </Fragment>
  )
}

export default Layout