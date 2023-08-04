import AdminNav from "@/components/admin/AdminNav"
import s from "../index.module.css";
import NewCamperForm from "@/components/forms/NewCamperForm";
import { useState } from "react";

const editCamperAccounts = () => {
  const [newCamperData, setNewCamperData] = useState({});
  const postCamperHandler = async (data) => {
    // console.log(`new camper: ${newCamperData.accountId}`);
    setNewCamperData(data);
    console.log("data about to be posted: ", data);
    console.log("newCamperData", newCamperData);
    console.log("Welcome to the pre-axios waiting room....");
    const response = await fetch("/api/campers/addCamper", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return(
      <section className={s.adminSection}>
          <AdminNav/>
          <NewCamperForm onAdd={postCamperHandler}/>
      </section>
  )
}

export default editCamperAccounts;