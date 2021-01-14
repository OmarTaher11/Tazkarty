import Image from "next/image";
import { useEffect,useState } from "react";
import {link} from "../../link"
export default function Match(props) {
  const [reservedSeat, setReservedSeat] = useState("")
  const [time, setTime] = useState(null);

  var userID;
  if (typeof window !== "undefined") {
    userID = localStorage.getItem("_id");
  }

  const [temp, setTemp] = useState(0)
  const [items, setItems] = useState(props)

  // useEffect(()=>{
  //   setInterval(()=>{
  //     setTemp((prevTemp)=>prevTemp+1)
  //   }, 10000)
  // }, [])
  
  // useEffect(()=>{
  //   var url = "/match/getByID?_id=" + props.data._id;
  //   var reqUrl = link + url;
  //   const requestOptions = {
  //     method: "GET",
  //     mode: 'cors',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   fetch(reqUrl, requestOptions).then((response)=> response.json).then(
  //     (response)=> {    setItems(response)}
  //   )
  
  //   }, [temp])

  var reserveTicket = () => {
    var kr = reservedSeat[0]
    var ki = reservedSeat[2]
    console.log(kr)
    console.log(ki)
    var reqBody = JSON.stringify({  
      _id: userID,
      Match_id:props.data._id,
      row:kr,
      idx:ki  
    });
    const requestOptions = {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    };
    var url = link+ "/ticket/book"
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
          if (response._id_ === null){
            alert("Failed to reserve ticket")
          }
          else {
            alert("reservation complete")
          }

      });
  }

  const {_id, 
    Seats, 
    Home_Team, 
    Away_Team, 
    stadium, 
    Date, 
    Main_Ref, 
    Line1_Ref, 
    Line2_Ref} = items.data
    var length = stadium.Length
    var w = stadium.Width
    var lengthCounter = 0;
    var allCounter = 0;
    var rowIndex = 0
    var oneRowArr = []
    var allRowArr = []
    console.log("it is " + Seats.length)
     Seats.map((seat, index)=> {
      if ( lengthCounter % w === 0 && lengthCounter !==0)
      {
        lengthCounter = 0
        allRowArr.push(<div className = "row" >{oneRowArr}</div>)
        oneRowArr = []
        rowIndex++
      }
      if (seat === 1){
        var row = Math.floor(index /w)
        var col = index % w
        var key1 = row.toString() + "," + col.toString()
        oneRowArr.push(<button type="button" key = {key1} className="btn btn-danger" disabled>{lengthCounter}</button>)
      }
      
      else {
        var row = Math.floor(index /w)
        var col = index % w
        var key2 = row.toString() + "," + col.toString()
        oneRowArr.push(<button type="button" key = {key2} className="btn btn-primary" onClick = {() => {
          console.log(key2)
          setReservedSeat( key2) }}>{lengthCounter}</button>)
      }
      lengthCounter++
      allCounter++
    })
    allRowArr.push(<div className = "row" >{oneRowArr}</div>)
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
        <div>{allRowArr}</div>
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
  const res = await fetch(reqUrl, requestOptions)
  const data = await res.json()
  return {
    props: {
      data
    },
  };
}


