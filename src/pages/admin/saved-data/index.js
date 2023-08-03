import AdminNav from "@/components/admin/AdminNav";
import s from "../index.module.css";

const savedData = () => {
  const getJsonFileNames = async() => {
    const response = await fetch("/api/campers/download-data")
    console.log("response: ", response)
  }
  getJsonFileNames();
  return (
    <section className={s.adminSection}>
      <h1>Backup Data</h1>
      <AdminNav />
    </section>
  );
};

export default savedData;