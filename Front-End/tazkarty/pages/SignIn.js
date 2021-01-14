import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import {link} from '../link.js'
export default function SignIn(props) {
  const router = useRouter();
  var signInUrl = link + '/user/fan/signin';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /\S+@\S+\.\S+/;
  const reg = /^\S+$/;
  var validateForm = () => {
    if (!email) {
      alert("Please enter a valid email");
      return;
    }
    if (!email.match(emailRegex)) {
      alert("Please enter a valid email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }

    if (!reg.test(password)) {
      alert("Please enter a password that doesn't have a space");
      return;
    }
    // alert("Validation Complete");
    

     requestSignIn();
  };
  var requestSignIn = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  Email:email,   Password:password }),
    };
    fetch(signInUrl, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.Error === "unable to login")
        {
          alert("Unable to login");
          return;
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("_id", response.userId);
        }
        console.log(response)
        router.push('/', undefined, { shallow: true });
      });
  };

  return (
    <>
      <div className="container m-auto w-25 py-5">
        <Image
          className="img-fluid"
          src="/EPLogo.jpeg"
          alt=""
          width="100%"
          height="55%"
          layout="responsive"
        ></Image>
        <form>
          <label htmlFor="inputEmail" className="d-block my-2 font-weight-bold">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="d-block my-2 w-100"
            placeholder="Email address"
            required
          />
          <label
            htmlFor="inputPassword"
            className="visually-hidden d-block my-2 font-weight-bold"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="d-block my-2 w-100"
            placeholder="Password"
            required
          />
          <button
            type = "button"
            className="w-100 btn btn-lg btn-primary my-2"
            onClick={() =>validateForm()}
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
