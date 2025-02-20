import axios from "axios";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import Warning from "../components/Warning";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
      return;
    }
  }, [navigate]);

  return (
    <div className="h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-90 p-10 border border-solid h-max">
          <Heading label={"Signup"} />
          <SubHeading label={"Enter details to create an account."} />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            type={"text"}
            onchange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            type={"text"}
            onchange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            type={"text"}
            onchange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={""}
            type={"password"}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            label={`Signup`}
            onclick={async () => {
              const response = await axios.post(
                "https://taskiee-production.up.railway.app/api/v1/user/signup",
                {
                  username: email,
                  firstName: firstName,
                  lastName: lastName,
                  password: password,
                }
              );
              const token = response.data.token;
              if (token) {
                localStorage.setItem("token", token);
                navigate("/dashboard");
              } else {
                setWarning(response.data.message);
                setTimeout(() => {
                  setWarning("");
                }, 5000);
              }
            }}
          />

          <Warning label={warning} />

          <BottomWarning
            label={"Already have an account?"}
            to={"/login"}
            warning={"Login"}
          />
        </div>
      </div>
    </div>
  );
}
