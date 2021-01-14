// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { link } from "../link";
// import TicketCard from "../components/TicketCard";
// export default function Profile() {
//   const [homeTeam, setHomeTeam] = useState("");
//   const [awayTeam, setAwayTeam] = useState("");
//   const [stadium, setStadium] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [gender, setGender] = useState("");
//   const [city, setCity] = useState("");
//   const [address, setAddress] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const [tickets, setTickets] = useState([]);
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setUsername(localStorage.getItem("Username"));
//       setEmail(localStorage.getItem("Email"));
//       setFirstName(localStorage.getItem("First_name"));
//       setLastName(localStorage.getItem("Last_name"));
//       setAddress(localStorage.getItem("Address"));
//       setCity(localStorage.getItem("City"));
//       setBirthDate(localStorage.getItem("Birth_date"));
//       setGender(localStorage.getItem("Gender"));
//       setPassword(localStorage.getItem("Password"));
//       setTickets(localStorage.getItem("tickets"));
//     }
//   }, []);
//   var managerRequest = () => {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ Email: email, Password: password }),
//     };
//     fetch(SignInUrl, requestOptions).then((response) => response.json());
//   };

//   var adminRequest = () => {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ Email: email, Password: password }),
//     };
//     fetch(SignInUrl, requestOptions).then((response) => response.json());
//   };

//   var updateInfoRequest = () => {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         First_name: firstName,
//         Last_name: lastName,
//         newPassword: password,
//         Birth_date: birthDate,
//         City: city,
//         Address: address,
//         _id: localStorage.getItem("_id"),
//       }),
//     };
//     var updateUrl = link + "/user/fan/editinfo";
//     fetch(updateUrl, requestOptions)
//       .then((response) => response.json())
//       .then((response) => {
//         if (typeof window !== "undefined") {
//           localStorage.setItem("First_name", response.First_name);
//           localStorage.setItem("Last_name", response.Last_name);
//           localStorage.setItem("Birth_date", response.Birth_date);
//           localStorage.setItem("City", response.City);
//           localStorage.setItem("Address", response.Address);
//           localStorage.setItem("Email", response.Email);
//           localStorage.setItem("Tickets", response.Tickets);
//         }
//         alert("Your information has been updated.");
//       });
//   };

//   return (
//     <div className="container my-5">
//       {/*  ROW 1 */}

//       <div className="row">
//         <div className="col-4">
//           {" "}
//           <div className="container w-50 p-3">
//             <Image
//               className="img-fluid"
//               src="/ball.jpg"
//               alt="ball"
//               width="5%"
//               height="5%"
//               layout="responsive"
//             ></Image>
//           </div>
//         </div>

//         <div className="col-8 my-auto">
//           <h1 className="font-weight-bold">Profile Info</h1>
//         </div>
//       </div>

//       {/* Row 2 */}

//       <div className="row">
//         <div className="col-4">
//           <div className="container w-50 p-3">
//             <h4 className="font-weight-bold">John Wick</h4>
//           </div>
//           {/* {tickets.map((ticket) => {
//             <TicketCard _id = {} Home_Team = {} Away_Team = {} Date = {} Stadium_name = {} Seat = {}></TicketCard>
//           })} */}
//           {/* <TicketCard ticket = {ticket}></TicketCard>
//             <TicketCard></TicketCard> */}
//           <button className="w-100 btn btn-lg btn-primary my-2" type="button">
//             Request Manager Privileges
//           </button>
//           <button className="w-100 btn btn-lg btn-primary my-2" type="button">
//             Request Site Adminstrator Privileges
//           </button>
//         </div>

//         <div className="col-8">
//           <form>
//             {/* Username */}

//             <label htmlFor="Username" className="d-block my-2 font-weight-bold">
//               Username
//             </label>
//             <input
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               type="text"
//               className="d-block my-2 w-100"
//               placeholder="Username"
//               disabled
//             />

//             {/* First Name */}

//             <label
//               htmlFor="FirstName"
//               className="d-block my-2 font-weight-bold"
//             >
//               First Name
//             </label>
//             <input
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               type="text"
//               className="d-block my-2 w-100"
//               placeholder="First Name"
//             />

//             {/* Last Name */}

//             <label htmlFor="LastName" className="d-block my-2 font-weight-bold">
//               Last Name
//             </label>
//             <input
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               type="text"
//               className="d-block my-2 w-100"
//               placeholder="Last Name"
//             />

//             {/* Email */}

//             <label
//               htmlFor="inputEmail"
//               className="d-block my-2 font-weight-bold"
//             >
//               Email address
//             </label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               className="d-block my-2 w-100"
//               placeholder="Email address"
//               disabled
//             />

//             {/* Password */}

//             <label
//               htmlFor="inputPassword"
//               className="visually-hidden d-block my-2 font-weight-bold"
//             >
//               Password
//             </label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               className="d-block my-2 w-100"
//               placeholder="Password"
//             />

//             {/*  Gender */}
//             <label className="visually-hidden d-block my-2 font-weight-bold">
//               Gender
//             </label>
//             <div className="radio d-inline">
//               <label>
//                 <input type="radio" name="optradio" />
//                 Male
//               </label>
//             </div>
//             <div className="radio d-inline">
//               <label>
//                 <input type="radio" name="optradio" />
//                 Female
//               </label>
//             </div>

//             {/*  City */}

//             <label htmlFor="City" className="d-block my-2 font-weight-bold">
//               City
//             </label>
//             <input
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               type="text"
//               className="d-block my-2 w-100"
//               placeholder="City"
//             />

//             {/* Address */}

//             <label htmlFor="Address" className="d-block my-2 font-weight-bold">
//               Address
//             </label>
//             <input
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               type="text"
//               className="d-block my-2 w-100"
//               placeholder="Address"
//             />

//             {/* Birth Date */}

//             <label htmlFor="Date" className="d-block my-2 font-weight-bold">
//               Date of Birth
//             </label>
//             <input
//               value={birthDate}
//               onChange={(e) => setBirthDate(e.target.value)}
//               id="Date"
//               type="date"
//               className="d-block my-2 w-100"
//             />

//             {/* Sign Up */}

//             <button
//               className="w-100 btn btn-lg btn-primary my-2"
//               type="button"
//               onClick={() => updateInfoRequest()}
//             >
//               Update Information
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
