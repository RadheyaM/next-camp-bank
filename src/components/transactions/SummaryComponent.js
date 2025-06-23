import Card from "../UI/Card";
import { euro } from "../../../lib/helpers";

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

    return (
        <Card>
            <h1>SUMMARY</h1>
            <Card>
                <h2>BANK CURRENT TOTALS</h2>
                <h3>Bank Balance: {filteredData.bankBalance}</h3>
                <h3>Total Deposits: {filteredData.depCurrent}</h3>
            </Card>
            <Card>
                <h3>Deposits</h3>
                <h3>{filteredData.monTot.dep}</h3>
                <h3>Tuckshop</h3>
                <h3>{filteredData.monTot.tuck}</h3>
                <h3>Books</h3>
                <h3>{filteredData.monTot.book}</h3>
                <h3>Withdrawals</h3>
                <h3>{filteredData.monTot.out}</h3>
            </Card>
        </Card>
    )

};

export default SummaryComponent