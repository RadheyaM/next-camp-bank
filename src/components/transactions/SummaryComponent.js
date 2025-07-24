import Card from "../UI/Card";
import styles from "./SummaryComponent.module.css"
import Table from "../UI/Table";
import { euro } from "../../../lib/helpers";
import Paper from '@mui/material/Paper';

const SummaryComponent = (props) => {
    const { query } = props;
    const allData = query.data.data.data;

    const dayNames = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };

    const filteredData = {
        bankBalance: 0,
        depCurrent: 0,
        bookCurrent: 0,
        tuckCurrent: 0,
        popCurrent: 0,
        iceCurrent: 0,
        candyCurrent: 0,
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
            candy: 0,
            pop: 0,
            ice: 0,
            book: 0,
            out: 0,
        },
        tueTot: {
            dep: 0,
            tuck: 0,
            candy: 0,
            pop: 0,
            ice: 0,
            book: 0,
            out: 0,
        },
        wedTot: {
            dep: 0,
            tuck: 0,
            candy: 0,
            pop: 0,
            ice: 0,
            book: 0,
            out: 0,
        },
        thuTot: {
            dep: 0,
            tuck: 0,
            candy: 0,
            pop: 0,
            ice: 0,
            book: 0,
            out: 0,
        },
        friTot: {
            dep: 0,
            tuck: 0,
            candy: 0,
            pop: 0,
            ice: 0,
            book: 0,
            out: 0,
        },
        satTot: {
            dep: 0,
            tuck: 0,
            candy: 0,
            pop: 0,
            ice: 0,
            book: 0,
            out: 0,
        },
        sunTot: {
            dep: 0,
            tuck: 0,
            candy: 0,
            pop: 0,
            ice: 0,
            book: 0,
            out: 0,
        },
    }

    // filter for days and calc totals
    for (let i = 0; i < allData.length; i++) {
        const dep = "Deposit"
        const tuck = "Tuckshop"
        const pop = "Popcorn"
        const ice = "Icecream"
        const candy = "Candyfloss"
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
                    case pop:
                        filteredData.sunTot.pop += Number(allData[i].amount)
                        break;
                    case ice:
                        filteredData.sunTot.ice += Number(allData[i].amount)
                        break;
                    case candy:
                        filteredData.sunTot.candy += Number(allData[i].amount)
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
                    case pop:
                        filteredData.monTot.pop += Number(allData[i].amount)
                        break;
                    case ice:
                        filteredData.monTot.ice += Number(allData[i].amount)
                        break;
                    case candy:
                        filteredData.monTot.candy += Number(allData[i].amount)
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
                    case pop:
                        filteredData.tueTot.pop += Number(allData[i].amount)
                        break;
                    case ice:
                        filteredData.tueTot.ice += Number(allData[i].amount)
                        break;
                    case candy:
                        filteredData.tueTot.candy += Number(allData[i].amount)
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
                    case pop:
                        filteredData.wedTot.pop += Number(allData[i].amount)
                        break;
                    case ice:
                        filteredData.wedTot.ice += Number(allData[i].amount)
                        break;
                    case candy:
                        filteredData.wedTot.candy += Number(allData[i].amount)
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
                    case pop:
                        filteredData.thuTot.pop += Number(allData[i].amount)
                        break;
                    case ice:
                        filteredData.thuTot.ice += Number(allData[i].amount)
                        break;
                    case candy:
                        filteredData.thuTot.candy += Number(allData[i].amount)
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
                    case pop:
                        filteredData.friTot.pop += Number(allData[i].amount)
                        break;
                    case ice:
                        filteredData.friTot.ice += Number(allData[i].amount)
                        break;
                    case candy:
                        filteredData.friTot.candy += Number(allData[i].amount)
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
                    case pop:
                        filteredData.satTot.pop += Number(allData[i].amount)
                        break;
                    case ice:
                        filteredData.satTot.ice += Number(allData[i].amount)
                        break;
                    case candy:
                        filteredData.satTot.candy += Number(allData[i].amount)
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
            case pop:
                filteredData.popCurrent += Number(allData[i].amount)
                break;
            case candy:
                filteredData.candyCurrent += Number(allData[i].amount)
                break;
            case ice:
                filteredData.iceCurrent += Number(allData[i].amount)
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
        filteredData.depCurrent - 
        filteredData.tuckCurrent - 
        filteredData.bookCurrent - 
        filteredData.popCurrent -
        filteredData.candyCurrent -
        filteredData.iceCurrent -
        filteredData.outCurrent
    )

    const monday = (
        filteredData.monTot.dep - 
        filteredData.monTot.tuck - 
        filteredData.monTot.book - 
        filteredData.monTot.ice - 
        filteredData.monTot.pop - 
        filteredData.monTot.candy - 
        filteredData.monTot.out
    )
    const tuesday = (
        monday + filteredData.tueTot.dep - 
        filteredData.tueTot.tuck - 
        filteredData.tueTot.book - 
        filteredData.tueTot.ice - 
        filteredData.tueTot.pop - 
        filteredData.tueTot.candy - 
        filteredData.tueTot.out
    )
    const wednesday = (
        tuesday + filteredData.wedTot.dep - 
        filteredData.wedTot.tuck - 
        filteredData.wedTot.book - 
        filteredData.wedTot.ice - 
        filteredData.wedTot.pop - 
        filteredData.wedTot.candy - 
        filteredData.wedTot.out
    )
    const thursday = (
        wednesday + filteredData.thuTot.dep - 
        filteredData.thuTot.tuck - 
        filteredData.thuTot.book - 
        filteredData.thuTot.ice - 
        filteredData.thuTot.pop - 
        filteredData.thuTot.candy - 
        filteredData.thuTot.out
    )
    const friday = (
        thursday + filteredData.friTot.dep - 
        filteredData.friTot.tuck - 
        filteredData.friTot.book - 
        filteredData.friTot.ice - 
        filteredData.friTot.pop - 
        filteredData.friTot.candy - 
        filteredData.friTot.out
    )

    return (
        <Paper elevation={6} sx={{width: "95%", height: "100vh", display: "flex", flexBasis: "gap-between", gap: "4rem", padding: "2rem", backgroundColor: "#f8f8ff"}}>
            <Card>
                <Card>
                    <h2>BANK CURRENT TOTALS</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th className={styles.totals}>Bank Balance</th>
                                <th className={styles.totals}>Deposits</th>
                                <th className={styles.totals}>Tuckshop</th>
                                <th className={styles.totals}>Ice Cream</th>
                                <th className={styles.totals}>Popcorn/Candy Floss</th>
                                <th className={styles.totals}>Books</th>
                                <th className={styles.totals}>Withdrawals</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.totalsDataAdd}>{euro.format(filteredData.bankBalance)}</td>
                                <td className={styles.totalsDataAdd}>{euro.format(filteredData.depCurrent)}</td>
                                <td className={styles.totalsDataSub}>{euro.format(-filteredData.tuckCurrent)}</td>
                                <td className={styles.totalsDataSub}>{euro.format(-filteredData.iceCurrent)}</td>
                                <td className={styles.totalsDataSub}>{euro.format(-filteredData.popCurrent)}</td>
                                <td className={styles.totalsDataSub}>{euro.format(-filteredData.bookCurrent)}</td>
                                <td className={styles.totalsDataSub}>{euro.format(-filteredData.outCurrent)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
                <Card>
                    <h2>DAILY TOTALS</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th className={styles.totals}>Day</th>
                                <th className={styles.totals}>Balance</th>
                                <th className={styles.totals}>Deposits</th>
                                <th className={styles.totals}>Tuckshop</th>
                                <th className={styles.totals}>Ice Cream</th>
                                <th className={styles.totals}>Popcorn/Candy Floss</th>
                                <th className={styles.totals}>Books</th>
                                <th className={styles.totals}>Withdrawals</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.headers}>Monday</td>
                                <td className={styles.additions}>{euro.format(monday)}</td>
                                <td className={styles.additions}>{euro.format(filteredData.monTot.dep)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.monTot.tuck)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.monTot.ice)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.monTot.pop)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.monTot.book)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.monTot.out)}</td>
                            </tr>
                            <tr>
                                <td className={styles.headers}>Tuesday</td>
                                <td className={styles.additions}>{euro.format(tuesday)}</td>
                                <td className={styles.additions}>{euro.format(filteredData.tueTot.dep)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.tueTot.tuck)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.tueTot.ice)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.tueTot.pop)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.tueTot.book)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.tueTot.out)}</td>
                            </tr>
                            <tr>
                                <td className={styles.headers}>Wednesday</td>
                                <td className={styles.additions}>{euro.format(wednesday)}</td>
                                <td className={styles.additions}>{euro.format(filteredData.wedTot.dep)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.wedTot.tuck)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.wedTot.ice)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.wedTot.pop)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.wedTot.book)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.wedTot.out)}</td>
                            </tr>
                            <tr>
                                <td className={styles.headers}>Thursday</td>
                                <td className={styles.additions}>{euro.format(thursday)}</td>
                                <td className={styles.additions}>{euro.format(filteredData.thuTot.dep)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.thuTot.tuck)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.thuTot.ice)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.thuTot.pop)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.thuTot.book)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.thuTot.out)}</td>
                            </tr>
                            <tr>
                                <td className={styles.headers}>Friday</td>
                                <td className={styles.additions}>{euro.format(friday)}</td>
                                <td className={styles.additions}>{euro.format(filteredData.friTot.dep)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.friTot.tuck)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.friTot.ice)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.friTot.pop)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.friTot.book)}</td>
                                <td className={styles.subtractions}>{euro.format(-filteredData.friTot.out)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Card>
        </Paper>
        
    )

};

export default SummaryComponent