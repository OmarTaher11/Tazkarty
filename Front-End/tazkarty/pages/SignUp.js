import React, { useState } from "react";
import Image from "next/image";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const validateForm = () => {
    const namesRegex = /^[A-Za-z]+$/;
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.match(emailRegex)) {
      alert("Please enter a valid email");
      return;
    }
    if (!firstName.match(namesRegex)) {
      alert("Please enter a valid first name");
      return;
    }
    if (!lastName.match(namesRegex)) {
      alert("Please enter a valid last name");
      return;
    }
    if (!username.match(namesRegex)) {
      alert("Please enter a valid username");
      return;
    }
    if (password === "") {
      alert("Please enter a valid password");
      return;
    }
    if (gender === "") {
      alert("Please enter your gender");
      return;
    }
    if (city === "") {
      alert("Please enter your gender");
      return;
    }
    if (birthDate === "")
    {
      alert("Please enter your date of birth");
      return;
    }
    alert("Validation complete")
    //requestSignUp();
  };
  var requestSignUp = () => {
    var reqBody;
    if (address !== "")
    {
      reqBody = JSON.stringify({  
        username, 
        firstName, 
        lastName, 
        email, 
        password, 
        gender, 
        city, 
        birthDate, 
        address 
      });
    }
    else {
      reqBody = JSON.stringify({  
        username, 
        firstName, 
        lastName, 
        email, 
        password, 
        gender, 
        city, 
        birthDate, 
      });
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    };
    fetch(SignInUrl, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.approved == "accepted") {

          /* TODO: 
          1. Save user data into local storage
          // if (typeof window !== "undefined") {
          //   localStorage.setItem("myCat", "Tom");
          // }
          2. Rout to the homepage
            router.push('/', undefined, { shallow: true });
          */
        }
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
          {/* Username */}

          <label htmlFor="Username" className="d-block my-2 font-weight-bold">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="d-block my-2 w-100"
            placeholder="Username"
            required
          />

          {/* First Name */}

          <label htmlFor="FirstName" className="d-block my-2 font-weight-bold">
            First Name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="d-block my-2 w-100"
            placeholder="First Name"
            required
          />

          {/* Last Name */}

          <label htmlFor="LastName" className="d-block my-2 font-weight-bold">
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="d-block my-2 w-100"
            placeholder="Last Name"
            required
          />

          {/* Email */}

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

          {/* Password */}

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

          {/*  Gender */}
          <label className="visually-hidden d-block my-2 font-weight-bold">
            Gender
          </label>
          <div class="radio d-inline">
            <label>
              <input
                value={gender}
                onChange={(e) => setGender("M")}
                type="radio"
                name="optradio"
              />
              Male
            </label>
          </div>
          <div class="radio d-inline">
            <label>
              <input
                value={gender}
                onChange={(e) => setGender("F")}
                type="radio"
                name="optradio"
              />
              Female
            </label>
          </div>

          {/*  City */}

          <label htmlFor="City" className="d-block my-2 font-weight-bold">
            City
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="d-block my-2 w-100"
            placeholder="City"
            required
          />

          {/* Address */}

          <label htmlFor="Address" className="d-block my-2 font-weight-bold">
            Address
          </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            className="d-block my-2 w-100"
            placeholder="Address"
          />

          {/* Birth Date */}

          <label htmlFor="Date" className="d-block my-2 font-weight-bold">
            Date of Birth
          </label>
          <input
            onChange={(e) => setBirthDate(e.target.value)}
            value={birthDate}
            id="Date"
            type="date"
            className="d-block my-2 w-100"
          />

          {/* Sign Up */}

          <button className="w-100 btn btn-lg btn-primary my-2" type="button" onClick = {()=> validateForm()}>
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}
