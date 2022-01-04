import React, { useState, useEffect } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [is_driver, setIs_driver] = useState(false);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const [hes_code, setHesCode] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace(window.env.FRONTEND_URL + "/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password1: password1,
      password2: password2,
      is_driver: is_driver,
      hes_code_value: hes_code,
      first_name: first_name,
      last_name: last_name,
    };

    fetch(window.env.BACKEND_URL + "/api/v1/users/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          window.location.replace(window.env.FRONTEND_URL + "/dashboard");
        } else {
          setEmail("");
          setPassword1("");
          setPassword2("");
          setIs_driver(false);
          setFirstName("");
          setLastName("");
          setHesCode("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  const changeUsageStatus = (event) => {
    console.log(event.target.value);
    if (event.target.value === "traveller") {
      setIs_driver(false);
    } else {
      setIs_driver(true);
    }
  };

  return (
    <div id="signup">
      {loading === false && <h1>Signup</h1>}
      {errors === true && <h2>Cannot signup with provided credentials</h2>}
      <form onSubmit={onSubmit}>
      <label htmlFor="first_name">First Name:</label> <br />
        <input
          name="first_name"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="last_name">Last Name:</label> <br />
        <input
          name="last_name"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="email">Email address:</label> <br />
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="hes_code">HES Code:</label> <br />
        <input
          name="hes_code"
          type="text"
          value={hes_code}
          onChange={(e) => setHesCode(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="password1">Password:</label> <br />
        <input
          name="password1"
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="password2">Confirm password:</label> <br />
        <input
          name="password2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />{" "}
        <br />
        <select onChange={changeUsageStatus}>
          <option value="driver">Driver</option>
          <option value="traveller">Traveller</option>
        </select>
        <br />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default Signup;
