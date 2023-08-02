import { Fragment } from "react";
import s from "./index.module.css";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminOverviewTable from "@/components/admin/AdminOverviewTable";
import TableFilterSort from "@/components/admin/TableFilterSort";
import AdminNav from "@/components/admin/AdminNav";
import clientPromise from "../../../lib/db";
import { sumObjectArrayAmounts } from "../../../lib/helpers";

const dashboard = ({ trans, fifty, amounts }) => {
  const totalDep = Number(sumObjectArrayAmounts(amounts.dep));
  const totalBooks = Number(sumObjectArrayAmounts(amounts.book));
  const totalTuckshop = Number(sumObjectArrayAmounts(amounts.tuck));
  const totalWithdrawals = Number(sumObjectArrayAmounts(amounts.with));
  const totalAdjustments = Number(sumObjectArrayAmounts(amounts.adj));
  return (
    <Fragment>
      <section className={s.adminSection}>
        <h1>Admin Dashboard...</h1>
        <AdminNav />
        <AdminOverview trans={trans} />
        <div className={s.summaryContDiv}>
          <AdminOverviewTable />
        </div>
        <div className={s.summaryContDiv}>
          <TableFilterSort trans={trans} fifty={fifty}/>
        </div>
      </section>
    </Fragment>
  );
};

export default dashboard;

export const getServerSideProps = async () => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Transactions");
  // 50 most recent.
  const fifty = await col.find({}).sort({ timeStamp: -1 }).limit(50).toArray();
  // All transactions
  const trans = await col.find({}).toArray();
  //Amount Lists
  const deposits = await col
    .find({ category: "Deposit" }, { amount: 1 })
    .toArray();
  const books = await col.find({ category: "Book" }, { amount: 1 }).toArray();
  const tuck = await col
    .find({ category: "Tuckshop" }, { amount: 1 })
    .toArray();
  const withdrawals = await col
    .find({ category: "Withdrawal" }, { amount: 1 })
    .toArray();
  const adjustments = await col
    .find({ category: "Adjustment" }, { amount: 1 })
    .toArray();
  console.log("adjustments: ", adjustments);
  const data = JSON.parse(JSON.stringify(trans));
  const fiftyData = JSON.parse(JSON.stringify(fifty));
  const depData = JSON.parse(JSON.stringify(deposits));
  const bookData = JSON.parse(JSON.stringify(books));
  const tuckData = JSON.parse(JSON.stringify(tuck));
  const withData = JSON.parse(JSON.stringify(withdrawals));
  const adjData = JSON.parse(JSON.stringify(adjustments));
  // writeLocal(data);
  return {
    props: {
      trans: data,
      fifty: fiftyData,
      amounts: {
        dep: depData,
        book: bookData,
        tuck: tuckData,
        with: withData,
        adj: adjData,
      },
    },
  };
};
