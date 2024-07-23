import { Fragment } from "react";
import styles from "./Dashbaord.module.css";
import { euro } from "../../../lib/helpers";

const Dashboard = (props) => {
    const {camper, query} = props;
    const data = query.data.data.data;
    const camperId = camper.accountId

    return (
        <Fragment>
            <h2>Bank Total: {euro.format(data.total)}</h2>
            <div>

                <h3>Deposit Total: {euro.format(data.dep)}</h3>
                <h3>Deposit Count: {data.depositCount}</h3>
                <h3>Book Total: {euro.format(data.book)}</h3>
                <h3>Book Count: {data.bookCount}</h3>
                <h3>Tuckshop Total: {euro.format(data.tuck)}</h3>
                <h3>Tuckshop Count: {data.tuckCount}</h3>
                <h3>Withdrawal Total: {euro.format(data.with)}</h3>
                <h3>Withdrawal Count: {data.withCount}</h3>
            </div>
        </Fragment>
    )
};

export default Dashboard;