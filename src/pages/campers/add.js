import { useState } from "react";

import NewCamperForm from "@/components/forms/NewCamperForm";

import axios from "axios";

const AddCamper = (props) => {
  const [newCamperData, setNewCamperData] = useState({});
  const postCamperHandler = (data) => {
    // console.log(`new camper: ${newCamperData.accountId}`);
    // setNewCamperData(data);
    console.log("data about to be posted: ", data)
    postNewCamper(data);
  };
  const postNewCamper = async (data) => {
    console.log("Welcome to the pre-axios waiting room....")
    await axios.post("/api/campers/addCamper", data);
  };
  return <NewCamperForm onAdd={postCamperHandler} />;
};

export default AddCamper;
