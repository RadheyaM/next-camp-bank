import ScanCamperCode from "@/components/forms/ScanCamperCode";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

const HomePage = () => {
  const {status, data} = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth");
    }
  }, [status]);
  if (status === "authenticated") {
    return (
      <ScanCamperCode />
    )
  }
};

export default HomePage;