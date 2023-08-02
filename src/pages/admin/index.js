import { Fragment } from "react";
import s from "./index.module.css";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminOverviewTable from "@/components/admin/AdminOverviewTable";
import TableFilterSort from "@/components/admin/TableFilterSort";
import AdminNav from "@/components/admin/AdminNav";
import clientPromise from "../../../lib/db";

const dashboard = ({ trans }) => {
  // console.log("trans: ", trans);
  return (
    <Fragment>
      <section className={s.adminSection}>
        <h1>Admin Dashboard...</h1>
        <AdminNav />
        <AdminOverview />
				<div className={s.summaryContDiv}>
					<AdminOverviewTable />
        </div>
				<div className={s.summaryContDiv}>
					<TableFilterSort trans={trans}/>
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
  // const trans = await col.find({}).sort({timeStamp: -1}).limit(50).toArray();
  const trans = await col.find({}).toArray();
  const data = JSON.parse(JSON.stringify(trans));
  // writeLocal(data);
  return {
    props: {
      trans: data,
    }
  }
}
