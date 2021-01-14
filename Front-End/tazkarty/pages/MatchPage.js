import Image from "next/image";
import NavBar from "../components/NavBar"
import MatchCard from "../components/MatchCard"
import {link} from "../link"
export default function MatchPage({data}) {
    var matchInfo = { data };
    //  console.log(matchInfo);
    //  var signedIn;

    var matchCards = matchInfo.data.map((match) => (
      <MatchCard data={match}></MatchCard>
    ));
    return (
      <>
      <div className="d-flex justify-content-around p-4 flex-wrap">
        {matchCards}
      </div>
    </>
    )

}

export async function getServerSideProps(context) {
  var url = "/match/getAll"
  var reqUrl = link + url;
  console.log(reqUrl)
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(reqUrl, requestOptions)
  const data = await res.json();
  
     console.log(data)
  
  

  return {
    props: { data }, // will be passed to the page component as props
  };
}