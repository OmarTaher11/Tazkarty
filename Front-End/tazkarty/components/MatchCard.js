import Image from "next/image";
import styles from "../styles/Card.module.css";

export default function MatchCard() {
return(
<div className="card w-25 mx-4"  >
  <Image className="card-img-top" src="/vs.jpg" alt="Card image cap" width="100%" height="35%" layout="responsive"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
)}