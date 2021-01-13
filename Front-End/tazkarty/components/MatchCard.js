import Image from "next/image";
import styles from "../styles/Card.module.css";

export default function MatchCard(props) {

var myData = props.data

return(
<div className="card w-25  mx-auto"  >
  <Image className="card-img-top" src="/vs.jpg" alt="Card image cap" width="100%" height="35%" layout="responsive"/>
  <div className="card-body mx-auto justify-content-center">
    <h5 className="card-title  text-center">{myData.Home_Team + " vs "+ myData.Away_Team} </h5>
    <p className="card-text text-center">{myData.stadium.Stadium_name}</p>
    <p className="card-text text-center">{myData.Date}</p>
    <p className="card-text text-center">{myData.Main_Ref}</p>
    <p className="card-text text-center">{myData.Line1_Ref}</p>
    <p className="card-text text-center">{myData.Line2_Ref}</p>
    <a href = {`matches/${myData._id}`}>
    <button href="#" className="btn btn-primary text-center ">Go somewhere</button>
    </a>
  </div>
</div>
)}