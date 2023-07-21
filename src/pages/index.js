import ScanCamperCode from "@/components/forms/ScanCamperCode";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const session = useSession();
  console.log(session)
  return (
    <ScanCamperCode />
  )
};

export default HomePage;