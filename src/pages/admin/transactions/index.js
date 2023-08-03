import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import s from "../index.module.css";
import TableFilterSort from "@/components/admin/TableFilterSort";
import AdminNav from "@/components/admin/AdminNav";
import clientPromise from "../../../../lib/db";

const adminTransactions = ({trans, fifty}) => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth");
    }
  }, [status]);
  if (status === "authenticated") {
    return(
      <section className={s.adminSection}>
        <h1>Admin Transactions</h1>
        <AdminNav />
        <div className={s.summaryContDiv}>
            <TableFilterSort trans={trans} fifty={fifty}/>
        </div>
      </section>
    )
  }
}

export default adminTransactions;

export const getServerSideProps = async () => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("Transactions");
  // 50 most recent.
  const fifty = await col.find({}).sort({ timeStamp: -1 }).limit(50).toArray();
  // All transactions
  const trans = await col.find({}).toArray();
  const data = JSON.parse(JSON.stringify(trans));
  const fiftyData = JSON.parse(JSON.stringify(fifty));
  // writeLocal(data);
  return {
    props: {
      trans: data,
      fifty: fiftyData,
    },
  };
};