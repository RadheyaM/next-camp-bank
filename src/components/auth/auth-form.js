import { useState, useRef } from "react";
import styles from "./auth-form.module.css";
import { signIn } from "next-auth/react";
import Router from "next/router";
import Paper from '@mui/material/Paper';
import { Alert, CircularProgress } from '@mui/material';

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
  return data;
};

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // toggle between signIn and signUp.
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null);
  };

  const submitHandler = async (event) => {
    console.log("submit handler")
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value;

    setError(null);
    setSubmitting(true);

    if (isLogin) {
      console.log("isLogin === true")
      try {
        const result = await signIn("credentials", {
          email: enteredEmail,
          password: enteredPassword,
          redirect: false,
        });
        console.log("result: ", result);

        if (result.error) {
          setError("Invalid username or password. Please try again.");
          setSubmitting(false);
          return;
        }

        // Login Success!
        localStorage.setItem("User", enteredEmail);
        Router.replace('/');
      } catch (err) {
        console.error("Login Error:", err);
        setError("A network error occurred. Please try again.");
        setSubmitting(false);
      }
    } else {
      try {
        console.log("try block")
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
        
        // Creation Success! Auto-login
        localStorage.setItem("User", enteredEmail);
        Router.replace('/');
      } catch (err) {
        console.log("create user error: ", err);
        setError(err.message || 'An error occurred during account creation.');
        setSubmitting(false);
      }
    }
  };

  return (
    <section className={styles.auth}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>{isLogin ? "Sign In" : "Sign Up"}</h1>
      
      {error && (
        <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: "4px" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Username:</label>
          <input type="text" id="email" required ref={emailInputRef} disabled={submitting} />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            disabled={submitting}
          />
          <div className={styles.actions} style={{ marginTop: "1.5rem" }}>
            <button disabled={submitting} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              {submitting && <CircularProgress size={16} color="inherit" />}
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>
          {/* <div className={styles.actions} onClick={switchAuthModeHandler}>
            <button type="button">Sign Up</button>
          </div> */}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
