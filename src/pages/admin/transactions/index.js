import AdminNav from "@/components/admin/AdminNav"
import s from "../index.module.css";

const adminTransactions = () => {
    return(
        <section className={s.adminSection}>
            <AdminNav />
            <h1>Admin Transactions</h1>
        </section>
    )
}

export default adminTransactions;