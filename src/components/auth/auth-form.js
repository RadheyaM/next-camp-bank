import { useState, useRef } from "react";
import styles from "./auth-form.module.css";
import { signIn } from "next-auth/react";
import Router from "next/router";
import Paper from '@mui/material/Paper';

const createUser = async (email, password) => {
  console.log("you're in the create user fn...")
  const response = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify({email, password}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    console.log("response not ok...")
    throw new Error(data.message || 'Something went wrong...')
  }
  // console.log("data returned...")
  return data;
};

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  // toggle between signIn and signUp.
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    console.log("submit handler")
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // optional validation...
    if (isLogin) {
      console.log("isLogin === true")
      const result = await signIn("credentials", {
        email: enteredEmail,
        password: enteredPassword,
        redirect: false,
      });
      console.log("result: ", result);
    } else {
      try {
        console.log("try block")
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (err) {
        console.log("create user error: ", err);
      }
    }
    localStorage.setItem("User", enteredEmail);
    Router.replace('/');
  };
  return (
    <Paper elevation={6} sx={{
        width: "90%",
        height: "60vh", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem", 
        backgroundColor: "#f8f8ff"}}>
      <section className={styles.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="email">Username:</label>
            <input type="text" id="email" required ref={emailInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
            <div className={styles.actions}>
              <button>Login</button>
            </div>
            {/* <div className={styles.actions} onClick={switchAuthModeHandler}>
              <button>Sign Up</button>
            </div> */}
          </div>
        </form>
      </section>
    </Paper>
    
  );
};

export default AuthForm;
