import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MatchCard from "../components/MatchCard";
import { useEffect } from "react";
import { link } from "../link";
import { useRouter } from 'next/router';

// import logo from '../public/logo.png'; // with import
export default function Home({ data }) {
  var matchInfo = { data };
  // console.log("This is matchInfo")
  // console.log(matchInfo.data.matches);
  const router = useRouter();
  var url = link;
  var reqUrl = link + "/user/fan/getByID?";
  var matchCards = matchInfo.data.matches.map((match) => (
    <MatchCard data={match}></MatchCard>
  ));
  useEffect(() => {
    // user/fan/getByID?
    if (typeof window !== "undefined") {
      if (localStorage.getItem("_id") !== null) {
      var id = localStorage.getItem("_id");
      const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(reqUrl+"_id="+ id, requestOptions).then(
        (response) => response.json()).then((response)=>{
        const {
          _id,
          Username,
          First_name,
          Last_name,
          Birth_date,
          City,
          Address,
          Email,
          Gender,
          Role,
          Tickets,
       } = response;
        localStorage.setItem("_id", _id);
        localStorage.setItem("Username",Username);
        localStorage.setItem("First_name",First_name);
        localStorage.setItem("Last_name", Last_name);
        localStorage.setItem("Birth_date", Birth_date);
        localStorage.setItem("City", City);
        localStorage.setItem("Address", Address);
        localStorage.setItem("Email", Email);
        localStorage.setItem("Gender", Gender);
        localStorage.setItem("Role", Role);
        localStorage.setItem("Tickets", Tickets);
      });
    }
  }
} , []);
  return (
    <>
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
  //  console.log(data)
  var ht = data.HomeTeam;
  return {
    props: { data }, // will be passed to the page component as props
  };
}
