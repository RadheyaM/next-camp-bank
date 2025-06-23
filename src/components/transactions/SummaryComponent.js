import Card from "../UI/Card";
import styles from "./SummaryComponent.module.css"
import Table from "../UI/Table";
import { euro } from "../../../lib/helpers";

const SummaryComponent = (props) => {
    const { query } = props;
    const allData = query.data.data.data;
    console.log("allData: ", allData)

    const dayNames = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };

    // filter for days...
    // const monday = allData.filter(tran => tran.day = 1)
    // const tuesday = allData.filter(tran => tran.day = 2)
    // const wednesday = allData.filter(tran => tran.day = 3)
    // const thursday = allData.filter(tran => tran.day = 4)
    // const friday = allData.filter(tran => tran.day = 5)
    // const saturday = allData.filter(tran => tran.day = 6)
    // const sunday = allData.filter(tran => tran.day = 0)

    const filteredData = {
        bankBalance: 0,
        depCurrent: 0,
        bookCurrent: 0,
        tuckCurrent: 0,
        outCurrent: 0,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        monTot: {
            dep: 0,
            tuck: 0,
            book: 0,
            out: 0,
        },
        tueTot: {
            dep: 0,
            tuck: 0,
            book: 0,
            out: 0,
        },
        wedTot: {
            dep: 0,
            tuck: 0,
            book: 0,
            out: 0,
        },
        thuTot: {
            dep: 0,
            tuck: 0,
            book: 0,
            out: 0,
        },
        friTot: {
            dep: 0,
            tuck: 0,
            book: 0,
            out: 0,
        },
        satTot: {
            dep: 0,
            tuck: 0,
            book: 0,
            out: 0,
        },
        sunTot: {
            dep: 0,
            tuck: 0,
            book: 0,
            out: 0,
        },
    }

    // filter for days and calc totals
    for (let i = 0; i < allData.length; i++) {
        const dep = "Deposit"
        const tuck = "Tuckshop"
        const book = "Book"
        const out = "Withdrawal"

        switch (allData[i].day) {
            case 0:
                filteredData.sunday.push(allData[i]);
                switch (allData[i].category) {
                    case dep:
                        filteredData.sunTot.dep += Number(allData[i].amount)
                        break;
                    case tuck:
                        filteredData.sunTot.tuck += Number(allData[i].amount)
                        break;
                    case book:
                        filteredData.sunTot.book += Number(allData[i].amount)
                        break;
                    case out:
                        filteredData.sunTot.out += Number(allData[i].amount)
                        break;
                }
                break;
            case 1:
                filteredData.monday.push(allData[i]);
                switch (allData[i].category) {
                    case dep:
                        filteredData.monTot.dep += Number(allData[i].amount)
                        break;
                    case tuck:
                        filteredData.monTot.tuck += Number(allData[i].amount)
                        break;
                    case book:
                        filteredData.monTot.book += Number(allData[i].amount)
                        break;
                    case out:
                        filteredData.monTot.out += Number(allData[i].amount)
                        break;
                }
                break;
            case 2:
                filteredData.tuesday.push(allData[i]);
                switch (allData[i].category) {
                    case dep:
                        filteredData.tueTot.dep += Number(allData[i].amount)
                        break;
                    case tuck:
                        filteredData.tueTot.tuck += Number(allData[i].amount)
                        break;
                    case book:
                        filteredData.tueTot.book += Number(allData[i].amount)
                        break;
                    case out:
                        filteredData.tueTot.out += Number(allData[i].amount)
                        break;
                }
                break;
            case 3:
                filteredData.wednesday.push(allData[i]);
                switch (allData[i].category) {
                    case dep:
                        filteredData.wedTot.dep += Number(allData[i].amount)
                        break;
                    case tuck:
                        filteredData.wedTot.tuck += Number(allData[i].amount)
                        break;
                    case book:
                        filteredData.wedTot.book += Number(allData[i].amount)
                        break;
                    case out:
                        filteredData.wedTot.out += Number(allData[i].amount)
                        break;
                }
                break;
            case 4:
                filteredData.thursday.push(allData[i]);
                switch (allData[i].category) {
                    case dep:
                        filteredData.thuTot.dep += Number(allData[i].amount)
                        break;
                    case tuck:
                        filteredData.thuTot.tuck += Number(allData[i].amount)
                        break;
                    case book:
                        filteredData.thuTot.book += Number(allData[i].amount)
                        break;
                    case out:
                        filteredData.thuTot.out += Number(allData[i].amount)
                        break;
                }
                break;
            case 5:
                filteredData.friday.push(allData[i]);
                switch (allData[i].category) {
                    case dep:
                        filteredData.friTot.dep += Number(allData[i].amount)
                        break;
                    case tuck:
                        filteredData.friTot.tuck += Number(allData[i].amount)
                        break;
                    case book:
                        filteredData.friTot.book += Number(allData[i].amount)
                        break;
                    case out:
                        filteredData.friTot.out += Number(allData[i].amount)
                        break;
                }
                break;
            case 6:
                filteredData.saturday.push(allData[i]);
                switch (allData[i].category) {
                    case dep:
                        filteredData.satTot.dep += Number(allData[i].amount)
                        break;
                    case tuck:
                        filteredData.satTot.tuck += Number(allData[i].amount)
                        break;
                    case book:
                        filteredData.satTot.book += Number(allData[i].amount)
                        break;
                    case out:
                        filteredData.satTot.out += Number(allData[i].amount)
                        break;
                }
                break;
        };

        switch (allData[i].category) {
            case dep:
                filteredData.depCurrent += Number(allData[i].amount)
                break;
            case tuck:
                filteredData.tuckCurrent += Number(allData[i].amount)
                break;
            case book:
                filteredData.bookCurrent += Number(allData[i].amount)
                break;
            case out:
                filteredData.outCurrent += Number(allData[i].amount)
                break;
        }
    };

    filteredData.bankBalance = (
        filteredData.depCurrent - filteredData.tuckCurrent - filteredData.bookCurrent - filteredData.outCurrent
    )

    const monday = (
        filteredData.monTot.dep - filteredData.monTot.tuck - filteredData.monTot.book - filteredData.monTot.out
    )
    const tuesday = (
        filteredData.tueTot.dep - filteredData.tueTot.tuck - filteredData.tueTot.book - filteredData.tueTot.out
    )
    const wednesday = (
        filteredData.wedTot.dep - filteredData.wedTot.tuck - filteredData.wedTot.book - filteredData.wedTot.out
    )
    const thursday = (
        filteredData.thuTot.dep - filteredData.thuTot.tuck - filteredData.thuTot.book - filteredData.thuTot.out
    )
    const friday = (
        filteredData.friTot.dep - filteredData.friTot.tuck - filteredData.friTot.book - filteredData.friTot.out
    )

    console.log("filteredData: ", filteredData)

    return (
        <Card>
            <Card>
                <h2>BANK CURRENT TOTALS</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Bank Balance</th>
                            <th>Deposits</th>
                            <th>Tuckshop</th>
                            <th>Books</th>
                            <th>Withdrawals</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{euro.format(filteredData.bankBalance)}</td>
                            <td>{euro.format(filteredData.depCurrent)}</td>
                            <td>{euro.format(filteredData.tuckCurrent)}</td>
                            <td>{euro.format(filteredData.bookCurrent)}</td>
                            <td>{euro.format(filteredData.outCurrent)}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
            <Card>
                <h2>DAILY TOTALS</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Balance</th>
                            <th>Deposits</th>
                            <th>Tuckshop</th>
                            <th>Books</th>
                            <th>Withdrawals</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Monday</td>
                            <td>{euro.format(monday)}</td>
                            <td>{euro.format(filteredData.monTot.dep)}</td>
                            <td>{euro.format(filteredData.monTot.tuck)}</td>
                            <td>{euro.format(filteredData.monTot.book)}</td>
                            <td>{euro.format(filteredData.monTot.out)}</td>
                        </tr>
                        <tr>
                            <td>Tuesday</td>
                            <td>{euro.format(tuesday)}</td>
                            <td>{euro.format(filteredData.tueTot.dep)}</td>
                            <td>{euro.format(filteredData.tueTot.tuck)}</td>
                            <td>{euro.format(filteredData.tueTot.book)}</td>
                            <td>{euro.format(filteredData.tueTot.out)}</td>
                        </tr>
                        <tr>
                            <td>Wednesday</td>
                            <td>{euro.format(wednesday)}</td>
                            <td>{euro.format(filteredData.wedTot.dep)}</td>
                            <td>{euro.format(filteredData.wedTot.tuck)}</td>
                            <td>{euro.format(filteredData.wedTot.book)}</td>
                            <td>{euro.format(filteredData.wedTot.out)}</td>
                        </tr>
                        <tr>
                            <td>Thursday</td>
                            <td>{euro.format(thursday)}</td>
                            <td>{euro.format(filteredData.thuTot.dep)}</td>
                            <td>{euro.format(filteredData.thuTot.tuck)}</td>
                            <td>{euro.format(filteredData.thuTot.book)}</td>
                            <td>{euro.format(filteredData.thuTot.out)}</td>
                        </tr>
                        <tr>
                            <td>Friday</td>
                            <td>{euro.format(friday)}</td>
                            <td>{euro.format(filteredData.friTot.dep)}</td>
                            <td>{euro.format(filteredData.friTot.tuck)}</td>
                            <td>{euro.format(filteredData.friTot.book)}</td>
                            <td>{euro.format(filteredData.friTot.out)}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
        </Card>
    )

};

export default SummaryComponent