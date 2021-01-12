import Image from "next/image";
import NavBar from "../components/NavBar"
export default function MatchPage({data}) {
    var someData = {data} 
    var myData = someData.data.matches[0]

    console.log(myData)
    return (
    <> 
    <NavBar></NavBar>
    <Image
          className="img-fluid"
          src="/StadiumHD.jpg"
          alt=""
          width="100%"
          height="35%"
          layout="responsive"
        />
    <div className="container my-5">
    <h5 className="card-title  text-center">{myData.HomeTeam + " vs "+ myData.AwayTeam} </h5>
    <p className="card-text text-center">{myData.MatchVenue}</p>
    <p className="card-text text-center">{myData.Date}</p>
    <p className="card-text text-center">{myData.Time}</p>
    <p className="card-text text-center">{myData.Referee}</p>
    <p className="card-text text-center">{myData.Linesman1}</p>
    <p className="card-text text-center">{myData.Linesman2}</p>
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
    }
}
