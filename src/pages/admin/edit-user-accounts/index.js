import AdminNav from "@/components/admin/AdminNav"
import s from "../index.module.css";

const editUserAccounts = () => {
    return(
        <section className={s.adminSection}>
            <AdminNav/>
            <h1>Edit User Accounts</h1>
        </section>
    )
}

export default editUserAccounts;