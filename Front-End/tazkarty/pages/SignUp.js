import Image from "next/image";
export default function SignIn(props) {
  return (
    <div className="container m-auto w-25 py-5">
      <Image
        className="img-fluid"
        src="/EPLogo.jpeg"
        alt=""
        width="100%"
        height="55%"
        layout="responsive"
      ></Image>
      <form>
        {/* Username */}

        <label htmlFor="Username" className="d-block my-2 font-weight-bold">
          Username
        </label>
        <input
          type="text"
          className="d-block my-2 w-100"
          placeholder="Username"
          required
        />

        {/* First Name */}

        <label htmlFor="FirstName" className="d-block my-2 font-weight-bold">
          First Name
        </label>
        <input
          type="text"
          className="d-block my-2 w-100"
          placeholder="First Name"
          required
        />

        {/* Last Name */}

        <label htmlFor="LastName" className="d-block my-2 font-weight-bold">
          Last Name
        </label>
        <input
          type="text"
          className="d-block my-2 w-100"
          placeholder="Last Name"
          required
        />

        {/* Email */}

        <label htmlFor="inputEmail" className="d-block my-2 font-weight-bold">
          Email address
        </label>
        <input
          type="email"
          className="d-block my-2 w-100"
          placeholder="Email address"
          required
        />

        {/* Password */}

        <label
          htmlFor="inputPassword"
          className="visually-hidden d-block my-2 font-weight-bold"
        >
          Password
        </label>
        <input
          type="password"
          className="d-block my-2 w-100"
          placeholder="Password"
          required
        />

        {/*  Gender */}
        <label className="visually-hidden d-block my-2 font-weight-bold">
          Gender
        </label>
        <div class="radio d-inline">
          <label>
            <input type="radio" name="optradio" checked />
            Male
          </label>
        </div>
        <div class="radio d-inline">
          <label>
            <input type="radio" name="optradio" />
            Female
          </label>
        </div>

        {/*  City */}

        <label htmlFor="City" className="d-block my-2 font-weight-bold">
          City
        </label>
        <input
          type="text"
          className="d-block my-2 w-100"
          placeholder="City"
          required
        />

        {/* Address */}

        <label htmlFor="Address" className="d-block my-2 font-weight-bold">
          Address
        </label>
        <input
          type="text"
          className="d-block my-2 w-100"
          placeholder="Address"
        />

        {/* Birth Date */}

        <label htmlFor="Date" className="d-block my-2 font-weight-bold">
          Date of Birth
        </label>
        <input
          id = "Date"
          type="date"
          className="d-block my-2 w-100"
          
        />

        {/* Sign Up */}

        <button className="w-100 btn btn-lg btn-primary my-2" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
