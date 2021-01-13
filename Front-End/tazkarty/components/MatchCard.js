import Image from "next/image";
import styles from "../styles/Card.module.css";

export default function MatchCard(props) {
// console.log("props is ")
// console.log(props)
var myData = props.data;
myData.id = 234;
return(
<div className="card w-25  mx-auto"  >
  <Image className="card-img-top" src="/vs.jpg" alt="Card image cap" width="100%" height="35%" layout="responsive"/>
  <div className="card-body mx-auto justify-content-center">
    <h5 className="card-title  text-center">{myData.HomeTeam + " vs "+ myData.AwayTeam} </h5>
    <p className="card-text text-center">{myData.MatchVenue}</p>
    <p className="card-text text-center">{myData.Date}</p>
    <p className="card-text text-center">{myData.Time}</p>
    <p className="card-text text-center">{myData.Referee}</p>
    <p className="card-text text-center">{myData.Linesman1}</p>
    <p className="card-text text-center">{myData.Linesman2}</p>
    <a href = {`matches/${myData.id}`}>
    <button href="#" className="btn btn-primary text-center ">Go somewhere</button>
    </a>
  </div>
</div>
)}