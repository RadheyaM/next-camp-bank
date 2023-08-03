import AdminNav from "@/components/admin/AdminNav";
import s from "../index.module.css";

const savedData = () => {
  return (
    <section className={s.adminSection}>
      <h1>Backup Data</h1>
      <AdminNav />
    </section>
  );
};

export default savedData;