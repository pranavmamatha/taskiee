import axios from "axios";
import { useEffect, useState } from "react";
import User from "../components/User";
import Logout from "../components/logout";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [username, setUsername] = useState("testuser");
  const [firstName, setFirstName] = useState("u");
  const [lastName, setLastName] = useState("u");
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    axios
      .get("https://taskiee-production.up.railway.app/api/v1/user/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const response = res.data;
        setUsername(response.username);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setTotal(response.total);
        setCompleted(response.completed);
        setPending(response.pending);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  return (
    <div>
      <div className="mt-50">
        <User
          username={username}
          firstName={firstName}
          lastName={lastName}
          total={total}
          completed={completed}
          pending={pending}
        />
      </div>
      <div className="mt-10">
        <Logout />
      </div>
    </div>
  );
}
