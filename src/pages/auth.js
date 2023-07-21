import AuthForm from '../components/auth/auth-form';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

function AuthPage() {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      Router.replace("/");
    }
  }, [status]);
  if (status !== "authenticated") {
    return <AuthForm />;
  }
}

export default AuthPage;