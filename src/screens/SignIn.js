import React, { useState } from "react";
import "./SignIn.css";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [check, setCheck] = useState(false);

  function checkHandler() {
    setCheck(!check);
  }
  const navigate = useNavigate();
  return (
    <div className="container">
      <img
        className="background_image"
        src="https://www.universitymagazine.ca/wp-content/uploads/2021/08/How-to-Get-Netflix-For-Free.jpg"
      />

      <img
        src={require("../assets/netflixpng.png")}
        style={{
          width: 180,
          position: "absolute",
          top: 10,
          left: 20,
        }}
      />

      <div className="signIn_container">
        <h1 className="signIn_name">Sign In</h1>
        <input
          className="singnIn_email"
          placeholder="Email or phone number"
          // id="inputID"
        />
        <input className="singnIn_email" placeholder="Password" />
        <button
          className="login_Button"
          onClick={() => {
            navigate("/home");
          }}
        >
          <a style={{ fontWeight: "bold", fontSize: 20 }}>Sign In</a>
        </button>

        <a style={{ paddingTop: 10 }}>Forgot Pasword?</a>
        <div
          style={{
            display: "flex",
            alignItem: "center",
            marginTop: 10,
            // width: "100%",
          }}
        >
          <div
            className="checkbox"
            onClick={checkHandler}
            style={
              check
                ? { borderColor: "red", backgroundColor: "red" }
                : { backgroundColor: "grey", borderColor: "grey" }
            }
          >
            <AiOutlineCheck color={check ? "black" : "white"} />
          </div>

          <a style={{ alignSelf: "center" }}> Remember me</a>
        </div>
        <a style={{ paddingTop: 10, color: "grey" }}>
          New to Netflix?
          <span style={{ fontWeight: "bold", color: "white" }}>
            {"  "} Sign up now <br />
          </span>
        </a>
      </div>
    </div>
  );
}

export default SignIn;
