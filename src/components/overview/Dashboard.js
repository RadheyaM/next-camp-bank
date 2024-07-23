import { Fragment } from "react";
import styles from "./Dashbaord.module.css";
import { euro } from "../../../lib/helpers";

const Dashboard = (props) => {
    const {camper, query} = props;
    const transData = query.data.data.data;
    const camperId = camper.accountId

    // filter and sum up the four categories of transaction
    const calcTotals = (transData) => {
        const depLst = [];
        const bookLst = [];
        const tuckLst = [];
        const withLst = [];
        let depTotal = 0;
        let bookTotal = 0;
        let tuckTotal = 0;
        let withTotal = 0;

        transData.map((tran) => {
            if (tran.category == "Deposit") {
                depLst.push(Number(tran.amount))
            } else if (tran.category == "Book") {
                bookLst.push(Number(tran.amount))
            } else if (tran.category == "Tuckshop") {
                tuckLst.push(Number(tran.amount))
            } else {
                withLst.push(Number(tran.amount))
            }
        })

        for (let i = 0; i < depLst.length; i++) {
            depTotal += depLst[i];
        }

        for (let i = 0; i < bookLst.length; i++) {
            bookTotal += bookLst[i];
        }
        
        for (let i = 0; i < tuckLst.length; i++) {
            tuckTotal += tuckLst[i];
        }

        for (let i = 0; i < withLst.length; i++) {
            withTotal += withLst[i];
        }

        const data = {
            dep: depTotal,
            book: bookTotal,
            tuck: tuckTotal,
            with: withTotal
        };

        return data
    }

    return (
        <Fragment>
            <h2>Dashboard</h2>
            <div>
                <h3></h3>
                <h3></h3>
                <h3></h3>
                <h3></h3>
            </div>
        </Fragment>
    )
};

export default Dashboard;