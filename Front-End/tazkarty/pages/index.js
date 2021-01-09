import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import MatchCard from "../components/MatchCard"
// import logo from '../public/logo.png'; // with import
export default function Home() {
  return (<>
        <NavBar></NavBar>
        <div>
        <Image className = "img-fluid" src="/StadiumHD.jpg" alt="" width="100%" height="35%" layout="responsive" />
      </div>
      <div className = "d-flex justify-content-around p-4 flex-wrap">
      <MatchCard></MatchCard>
      <MatchCard></MatchCard>
      <MatchCard></MatchCard>
      <MatchCard></MatchCard>
      <MatchCard></MatchCard>
      <MatchCard></MatchCard>
      

      </div>
      </>
  );
}
