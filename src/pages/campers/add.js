import { useState, useEffect } from "react";

import NewCamperForm from "@/components/forms/NewCamperForm";

import axios from "axios";

const AddCamper = (props) => {
  const [receivedNewCamperData, setReceivedNewCamperData] = useState("");
  const [postedCamperId, setPostedCamperId] = useState("");
  const postCamperHandler = (newCamperData) => {
    console.log(`new camper: ${newCamperData.accountId}`);
    setReceivedNewCamperData(newCamperData);
    postNewCamper(receivedNewCamperData);
  };

  const postNewCamper = async (data) => {
    console.log(`data to be posted: ${data}`)
    const post = await axios.post("/api/campers/addCamper", data);
    console.log(post);
  };

  return <NewCamperForm onAdd={postCamperHandler} />;
};

export default AddCamper;
