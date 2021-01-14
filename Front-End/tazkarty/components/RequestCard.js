import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import {link} from '../link.js'

export default function RequestCard(props)
{
    var myData = {
        _id : "2l3kfa3",
        Home_Team: "Ahly",
        Away_Team: "Zamalek",
        Date: "12/23/2323",
        stadium :{
            Stadium_name: "Cairo Stadium",
        },
        Seat: "15",
    }
    return(
    <div className="card w-100  mx-auto">
    <Image
      className="card-img-top"
      src="/vs.jpg"
      alt="Card image cap"
      width="100%"
      height="35%"
      layout="responsive"
    />
    <div className="card-body mx-auto justify-content-center">
      <h5 className="card-title  text-center">
        {myData.Home_Team + " vs " + myData.Away_Team}{" "}
      </h5>
      <p>{"Ticket ID: " + myData._id}</p>
      <p className="card-text text-center">{myData.Date}</p>
      <p className="card-text text-center">{myData.stadium.Stadium_name}</p>
      <p className="card-text text-center">{"Seat: " + myData.Seat}</p>
        <button href="#" className="btn btn-primary text-center ">
          Cancel Ticket
        </button>
      
    </div>
  </div>);
}
