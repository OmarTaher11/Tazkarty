import Image from "next/image";
export default function Profile() {
  return (
    
    <div className="container my-5">
    
    {/*  ROW 1 */}

      <div className="row">
        <div className="col-4">
          {" "}
          <div className="container w-50 p-3">
          <Image
            className="img-fluid"
            src="/ball.jpg"
            alt="y u  like zis"
            width="5%"
            height="5%"
            layout="responsive"
          ></Image>
          </div>
        </div>

        <div className="col-8 my-auto"><h1 className = "font-weight-bold">Profile Info</h1></div>
      </div>

    {/* Row 2 */}

      <div className="row">
        <div className="col-4">
          {" "}
          <div className="container w-50 p-3">
            <h4 className = "font-weight-bold">John Wick</h4>
          </div>
        </div>

        <div className="col-8"><form>
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
        <div className="radio d-inline">
          <label>
            <input type="radio" name="optradio"  />
            Male
          </label>
        </div>
        <div className="radio d-inline">
          <label>
            <input type="radio" name="optradio" />
            Female
          </label>
        </div>

        {/*  City */}

        <label htmlFor="City" className ="d-block my-2 font-weight-bold">
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
          Update Information
        </button>
      </form>
</div>
      </div>
    </div>
  );
}
