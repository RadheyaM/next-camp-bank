import AdminNav from "@/components/admin/AdminNav"
import s from "../index.module.css";

const withdrawals = () => {
    return(
        <section className={s.adminSection}>
            <AdminNav />
            <h1>End of Camp Withdrawals</h1>
        </section>
    )
}

export default withdrawals;