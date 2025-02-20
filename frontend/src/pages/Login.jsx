import Heading from "../components/Heading";
import SubHeading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/button";
import BottomWarning from "../components/BottomWarning";
import Warning from "../components/Warning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center ">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-90 p-10 border border-solid h-max">
          <Heading label={"Login"} />
          <SubHeading label={"Enter your credentials to login"} />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            type={"text"}
            onchange={(e) => {
              setUsername(e.target.value);
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
            label={"Login"}
            onclick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username: username,
                  password: password,
                }
              );
              localStorage.setItem("token", response.data.token);
              if (response.data.token) {
                navigate("/dashboard");
              }
              if (response.data.message) {
                setWarning(response.data.message);
                await setTimeout(() => {
                  setWarning("");
                }, 5000);
              }
            }}
          />

          <Warning label={warning} color={"red"} />

          <BottomWarning
            label={"Don't have a account?"}
            warning={"Signup"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
