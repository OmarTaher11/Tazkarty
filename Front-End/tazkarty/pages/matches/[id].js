import Image from "next/image";
import { useState } from "react";
import {link} from "../../link"
export default function Match(props) {
 
  console.log(props)
  const {_id, 
    Seats, 
    Home_Team, 
    Away_Team, 
    stadium, 
    Date, 
    Main_Ref, 
    Line1_Ref, 
    Line2_Ref} = props.data
  return (
    <>
      <Image
        className="img-fluid"
        src="/StadiumHD.jpg"
        alt=""
        width="100%"
        height="35%"
        layout="responsive"
      />
      <div className="container my-5">
        <h5 className="card-title  text-center">
          {Home_Team + " vs " + Away_Team}{" "}
        </h5>
        <p className="card-text text-center">{stadium.Stadium_name}</p>
        <p className="card-text text-center">{Date}</p>
        <p className="card-text text-center">{Main_Ref}</p>
        <p className="card-text text-center">{Line1_Ref}</p>
        <p className="card-text text-center">{Line2_Ref}</p>
        <h3>Seats</h3>
        {Seats.map((seat) => {
          if (seat.available == "y") {
            return (
              <button type="button" className="btn btn-primary">
                {/* {seat.row + seat.index} */}b
              </button>
            );
          } else {
            return (
              <button type="button" className="btn btn-danger disabled">
                {/* {seat.row + seat.index} */}b
              </button>
            );
          }
        })}
        <button
          type="button"
          className="w-100 btn btn-lg btn-primary my-2"
          onClick={() => reserveTicket()}
        >
          Reserve Ticket
        </button>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  var paths = []
  var url = "/match/getAll"
  var reqUrl = link + url;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const res = await fetch(reqUrl, requestOptions)
  const data = await res.json()
  data.map((match)=> {
    paths.push("/matches/" + match._id)
  })
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  var url = "/match/getByID?_id=" + params.id;
  var reqUrl = link + url;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  var result;
  const res = await fetch(reqUrl, requestOptions)
  const data = await res.json()
  return {
    props: {
      data
    },
  };
}
