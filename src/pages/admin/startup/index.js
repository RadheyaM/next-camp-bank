import AdminNav from "@/components/admin/AdminNav"
import s from "../index.module.css";

const startup = () => {
    return(
        <section className={s.adminSection}>
            <AdminNav />
            <h1>Startup</h1>
        </section>
    )
}

export default startup;

export const getServerSideProps = async () => {
    
}