import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

function SignUp() {
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://movie-backend-wwpf.onrender.com/register", {
        name,
        email,
        password,
      });
      let userInfo = response.data;
      if (userInfo.isUserExist) {
        toast.warning("User Already Exist");
        navigate("/login");
      } else {
        toast.success("Register Successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.log("Something went wrong: ", err);
    }
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="container py-5  d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 p-4 bg-white shadow rounded">
          <h3 className="mb-5 text-center">CREATE AN ACCOUNT</h3>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="UserName"
              placeholder="UserName"
            />
            <label htmlFor="floatingPassword">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
            />
            <label htmlFor="floatingPassword">Enter Your Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary btn-block" type="submit">
              Register
            </button>
          </div>

          <h6 className="text-center mt-5">
            Have already an account?{" "}
            <Link to={"/login"} style={{ color: "#0d6efd" }}>
              Login here
            </Link>
          </h6>
        </div>
      </form>
    </>
  );
}

export default SignUp;
