import AdminNav from "@/components/admin/AdminNav"
import s from "../index.module.css";

const shutdown = () => {
    return(
        <section className={s.adminSection}>
            <AdminNav />
            <h1>Shut Down Camp</h1>
        </section>
    )
}

export default shutdown;