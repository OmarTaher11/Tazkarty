import Image from "next/image";
export default function SignIn(props) {
    return (
    <div className = "container m-auto w-25 py-5">
    <Image           
          className="img-fluid"
          src="/EPLogo.jpeg"
          alt=""
          width="100%"
          height="55%"
          layout="responsive"></Image>
    <form >
      <label htmlFor="inputEmail" className="d-block my-2 font-weight-bold">Email address</label>
      <input type="email"  className="d-block my-2 w-100" placeholder="Email address" required />
      <label htmlFor="inputPassword" className="visually-hidden d-block my-2 font-weight-bold">Password</label>
      <input type="password"  className="d-block my-2 w-100" placeholder="Password" required/>
      <button className="w-100 btn btn-lg btn-primary my-2" type="submit">Sign in</button>
    </form>
    </div>
  )
}