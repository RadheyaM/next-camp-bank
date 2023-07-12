import { useEffect, useState } from "react";

import NewCamperForm from "@/components/forms/NewCamperForm";

import axios from "axios";

const AddCamper = (props) => {
  const [newCamperData, setNewCamperData] = useState({});
  const postCamperHandler = (data) => {
    // console.log(`new camper: ${newCamperData.accountId}`);
    setNewCamperData(data);
    console.log("data about to be posted: ", newCamperData)
  };

  useEffect(() => {
    async (newCamperData) => {
      await axios.post("/api/campers/addCamper", newCamperData);
    };
  }, [newCamperData]);
  return <NewCamperForm onAdd={postCamperHandler} />;
};

export default AddCamper;
