import NavBar from '../../components/NavBar'
import Image from 'next/image'
export default function Match(props) {
    var myData = props.data;
    console.log(props)
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
    <h3>Seats</h3>
    {myData.seats.map(seat=>{
        if (seat.available == "y"){
            //TODO add blue button
            console.log("y u like zis")
            return(<button type="button" class="btn btn-primary">{seat.row + seat.index}</button>)
        }
        else {
            console.log("y u like zis..yyy")
            return(<button type="button" class="btn btn-danger disabled">{seat.row + seat.index}</button>)
        }
    })}
    </div>
    </>)
}


export async function getStaticPaths() {
    var paths = [
        {
            params:{
                id:"234"
            }
        },
        {
            params:{
                id:"2342"
            }
        },
        {
            params:{
                id:"23423"
            }
        },
        {
            params:{
                id:"42342"
            }
        },
        {
            params:{
                id:"1234"
            }
        }
        ]

    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps({ params }) {
    const data = {

          HomeTeam: 'Liverpool',
          AwayTeam: 'Markaz shabab nady el7abanya',
          MatchVenue: '5omasy elta7rer',
          Date: '29/12/2020',
          Time: '18:00',
          Referee: 'Image',
          Linesman1: 'is',
          Linesman2: 'Garbage',
          seats: [{row:"1", index:"2", available:"y"},{row:"2", index:"2", available:"n"},{row:"1",index:"3", available:"2"}]
        
    }
    return {
      props: {
        data
      }
    }
  }