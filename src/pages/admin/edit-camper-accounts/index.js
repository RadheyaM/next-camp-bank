import AdminNav from "@/components/admin/AdminNav"
import s from "../index.module.css";

const editCamperAccounts = () => {
    return(
        <section className={s.adminSection}>
            <AdminNav/>
            <h1>Edit Camper Accounts</h1>
        </section>
    )
}

export default editCamperAccounts;