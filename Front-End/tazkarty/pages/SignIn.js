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
      <h1 className="d-block my-2">Please sign in</h1>
      <label for="inputEmail" className="d-block my-2">Email address</label>
      <input type="email"  className="d-block my-2 w-100" placeholder="Email address" required autofocus/>
      <label for="inputPassword" className="visually-hidden d-block my-2">Password</label>
      <input type="password"  className="d-block my-2 w-100" placeholder="Password" required/>
      <button className="w-100 btn btn-lg btn-primary my-2" type="submit">Sign in</button>
    </form>
    </div>
  )
}