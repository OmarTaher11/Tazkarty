import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { link } from "../link.js";

export default function Manager(props) {
  
  var createMatch = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email, Password: password }),
    };
    fetch(SignInUrl, requestOptions).then((response) => response.json());
  };

  var editMatch = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email, Password: password }),
    };
    fetch(SignInUrl, requestOptions).then((response) => response.json());
  };
  
  
  
  
  
  
  
  return (
    <>
      <div className="row">
        <div className="col-4">
          <div className="container w-50 p-3">
          <button className="w-100 btn btn-lg btn-primary my-2" type="button">
            Create Match
          </button>
          </div>

        </div>


        <div className="col-4">
          <div className="container w-50 p-3">
          <button className="w-100 btn btn-lg btn-primary my-2" type="button">
            Edit Match
          </button>
          </div>

        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
 

  return {
    props: {  }, // will be passed to the page component as props
  };
}
