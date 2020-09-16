import React, { useState } from "react";
import { Form, FormInput, FormGroup, FormCheckbox, Button } from "shards-react";
import "./App.css";
import axios from "axios";
import classnames from "classnames";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./css/formCSS.css";

function App() {
  const [check, setCheck] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    emailConsent: check,
  });

  // Update the objects as the user types
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const clearForm = () => {
    setUser({
      fullName: "",
      email: "",
      birthDate: "",
      emailConsent: check,
    });
  };

  // Make an API call (post)
  const handleSubmit = (e) => {
    // e.preventDefault()
    axios
      .post(
        "https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
        user
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });

    alert("You are all set, we will contact you soon");
  };

  const toggleCheck = (check) => {
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }

    setUser({ ...user, emailConsent: !check });
  };

  return (
    <div className="container">
      <div className="box">
        <Form onSubmit={handleSubmit}>
          <label style={{ fontSize: 40 }}>Contact Us</label>
          <FormGroup>
            <label htmlFor="fullName">Name</label>
            <FormInput
              placeholder="Enter your full name"
              name="fullName"
              onChange={handleChange}
              value={user.fullName}
              required
              className={classnames(
                "form-control",
                { "is-invalid": user.fullName.length < 5 },
                { "is-valid": user.fullName }
              )}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="#email">Email</label>
            <FormInput
              type="text"
              placeholder="email@something.com"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={classnames(
                "form-control",
                { "is-valid": user.email },
                { "is-invalid": !user.email.includes("@") }
              )}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="birthDate">Birth date</label>
            <FormInput
              type="text"
              placeholder="Enter your date of birth"
              name="birthDate"
              value={user.birthDate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormCheckbox
            inline
            checked={check}
            onChange={() => toggleCheck(check)}
          >
            I agree to be contacted via email
          </FormCheckbox>
          <div className="buttonContainer">
            <Button
              theme="dark"
              style={{ marginRight: 10 }}
              onClick={clearForm}
            >
              Clear
            </Button>
            <Button
              theme="dark"
              type="submit"
              disabled={!check || !user.fullName || !user.email}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default App;
