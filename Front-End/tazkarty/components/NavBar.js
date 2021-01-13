import Image from "next/image";
import {useEffect, useState} from "react"
export default function NavBar() {
  var user = false;
  const [signedIn, setSignedIn] = useState(false)
  useEffect(()=> {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("_id") !== null) 
      {
        setSignedIn(true);
      }
    }
  }, [])

  var signOut = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("_id") !== null) {
        localStorage.clear();
        setSignedIn(false);
      }
    }
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex ">
        <a className="navbar-brand" href="/">
          <Image src="/tazkarty.png" alt="" width="65" height="45" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active h5">
              <a className="nav-link" href="/">
                Tazkarty <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
        {signedIn ? (
          <>
            <a href="/Profile">
              <button
                type="button"
                className="btn btn-primary m-2 d-flex align-self-end my-auto"
              >
                Profile
              </button>
            </a>
              <button
                type="button"
                className="btn btn-danger m-2 d-flex align-self-end my-auto"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
          </>
        ) : (
          <>
            <a href="/SignUp">
              <button
                type="button"
                className="btn btn-primary m-2 d-flex align-self-end my-auto"
              >
                Sign Up
              </button>
            </a>
            <a href="/SignIn">
              <button
                type="button"
                className="btn btn-primary m-2 d-flex align-self-end my-auto"
              >
                Sign In
              </button>
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
