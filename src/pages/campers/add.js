import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import NewCamperForm from "@/components/forms/NewCamperForm";

const AddCamper = (props) => {
  const router = useRouter();
  const [receivedNewCamperData, setReceivedNewCamperData] = useState("");
  const postCamperHandler = (newCamperData) => {
    setReceivedNewCamperData(newCamperData);
  };
  
  return <NewCamperForm onAdd={postCamperHandler} />;
};

export default AddCamper;
