import { useState } from "react";
import NewCamperForm from "@/components/forms/NewCamperForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

const AddCamper = (props) => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth");
    }
  }, [status]);
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

    const responseData = await response.json();
    console.log(responseData);
  };
  if (status === "authenticated") {
    return <NewCamperForm onAdd={postCamperHandler} />;
  }
};

export default AddCamper;
