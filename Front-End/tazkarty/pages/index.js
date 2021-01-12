import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import MatchCard from "../components/MatchCard";
// import logo from '../public/logo.png'; // with import
export default function Home({ data }) {
  var matchInfo = { data };
  console.log("This is matchInfo")
  console.log(matchInfo.data.matches);
   var matchCards = matchInfo.data.matches.map(match => <MatchCard data = {match}></MatchCard>)
  
  return (
    <>
      <NavBar></NavBar>
      <div>
      <Image
          className="img-fluid"
          src="/StadiumHD.jpg"
          alt=""
          width="100%"
          height="35%"
          layout="responsive"
        />
      </div>
      <div className="d-flex justify-content-around p-4 flex-wrap">
        {matchCards}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://run.mocky.io/v3/31372ede-0d28-46fa-b5ec-854f3aa56b12`
  );
  const data = await res.json();
   console.log(data)
  var ht = data.HomeTeam;
  return {
    props: { data }, // will be passed to the page component as props
  };
}
