const fs = require("fs").promises;
import path from "path";
import AdminNav from "@/components/admin/AdminNav";
import SavedDataList from "@/components/admin/SavedDataList";
import s from "../index.module.css";

const savedData = ({fileNames}) => {
  return (
    <section className={s.adminSection}>
      <h1>Backup Data</h1>
      <AdminNav />
      <SavedDataList filenames={fileNames}/>
    </section>
  );
};

export default savedData;

export const getServerSideProps = async () => {
  const findDataFiles = async (folderName) => {
    const dataFiles = await fs.readdir(folderName);
    console.log(dataFiles);
    console.log(dataFiles[0].slice(4, 15))
    return dataFiles;
  };
  const fileNames = await findDataFiles("data");
  return {
    props: {
      fileNames: fileNames,
    },
  };
};
