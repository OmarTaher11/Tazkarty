import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Router, useRouter } from "next/router";

import { link } from "../link.js";

export default function Admin(props) {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosenRequest, setChosenRequest] = useState("");
  const [chosenUser, setChosenUser] = useState("");
  const router = useRouter();

  var user;
  useEffect(async () => {
    var url = "/GetAllRequests?id=";
    if (typeof window !== "undefined") {
      if (localStorage.getItem("_id") !== undefined) {
        user = localStorage.getItem("_id");
        var reqUrl = link + url + user;
        console.log(reqUrl);
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        fetch(reqUrl, requestOptions)
          .then((res) => res.json())
          .then((res) => {
            setRequests(res.requests);
          });
      }
    }
    //  Todo update url
    var url = "/user/all";
    if (typeof window !== "undefined") {
      if (localStorage.getItem("_id") !== undefined) {
        user = localStorage.getItem("_id");
        var reqUrl = link + url;
        console.log(reqUrl);
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        fetch(reqUrl, requestOptions)
          .then((res) => res.json())
          .then((res) => {
            //TODO update users
            console.log(res);
            setUsers(res);
            setLoading(false);
          });
      }
    }
  }, []);

  var approveRequest = () => {
    // "_id":"5fff12c602e41d457828a86b",
    // "Req_id":"5fff8eb46b7695034c1c6c2e",
    // "type":"approve"
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: user,
        Req_id: chosenRequest,
        type: "approve",
      }),
    };
    var url = link + "/HandleRequest";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        // arouter.reload();
      });
  };

  var rejectRequest = () => {
    // "_id":"5fff12c602e41d457828a86b",
    // "Req_id":"5fff8eb46b7695034c1c6c2e",
    // "type":"approve"
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: user,
        Req_id: chosenRequest,
        type: "reject",
      }),
    };
    var url = link + "/HandleRequest";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        // router.reload();
      });
  };

  var removeAccount = () => {
    // "_id":"5fff1964db166534f878c59c",
    // "userToDelete":"5fffa03e71d03f41a0803a7e"
    var user1;
    if (typeof window !== "undefined") {
      if (localStorage.getItem("_id") !== undefined) {
        user1 = localStorage.getItem("_id");
      }
    }
    const requestOptions = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: user1, userToDelete: chosenUser }),
    };
    var url = link + "/user/delete";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        // router.reload();
      });
  };

  return (
    <>
      <h1>User requests</h1>
      <div className="container my-5">
        {!loading ? (
          requests.map((request) => (
            <div className="row">
              <div className="col-3">
                <p>{request.Owner}</p>
              </div>

              <div className="col-3 my-auto">
                <p className="font-weight-bold">{request.Req_Type}</p>
              </div>
              <div className="col-3 my-auto">
                <button
                  key={request._id}
                  type="button"
                  className="btn btn-primary m-2 d-flex align-self-end my-auto"
                  onClick={() => {
                    setChosenRequest(request._id);
                    approveRequest();
                  }}
                >
                  Approve Request
                </button>
              </div>
              <div className="col-3 my-auto">
                <button
                  type="button"
                  className="btn btn-primary m-2 d-flex align-self-end my-auto"
                  onClick={() => {
                    setChosenRequest(request._id);
                    rejectRequest();
                  }}
                >
                  Cancel Request
                </button>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <h1>Users </h1>
      <div className="row">
      <div className="col-3">
          <h2>Username</h2>

        </div>
        <div className="col-3">
          <h2>Last Name</h2>

        </div>
        <div className="col-3">
          <h2>First Name</h2>

        </div>


      </div>
      {!loading ? (
        users.map((user) => (
          <div className="row">
            <div className="col-3">
              <p>{user.Username}</p>
            </div>

            <div className="col-3 my-auto">
              <p className="font-weight-bold">{user.Last_name}</p>
            </div>
            <div className="col-3 my-auto">
              <p className="font-weight-bold">{user.First_name}</p>
            </div>
            <div className="col-3 my-auto">
              <button
                type="button"
                className="btn btn-primary m-2 d-flex align-self-end my-auto"
                onClick={() => {
                  setChosenUser(user._id);
                  removeAccount();
                }}
              >
                Remove User
              </button>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
