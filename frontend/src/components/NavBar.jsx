import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar({}) {
  const [response, setResponse] = useState({
    username: "0",
    firstName: "0",
    lastName: "0",
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [reload, setReload] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setResponse({
          username: res.data.username,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          total: res.data.total,
          completed: res.data.completed,
          pending: res.data.pending,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setReload(Math.random());
    }, 10000);
  }, [reload]);

  return (
    <div className="flex justify-between p-3 pr-7 rounded-2xl border border-solid">
      <Link to={"/dashboard"} className="text-3xl ml-5 text-center">
        Taskiee
      </Link>
      <div className="flex">
        <div className="flex mr-5 text-xl mt-1.25">
          <div className="mr-4 justify-center">Tasks: {response.total}</div>
          <div className="mr-4">Completed: {response.completed}</div>
          <div className="mr-4">Pending: {response.pending}</div>
        </div>
        <Link
          to="/profile"
          className="rounded-full bg-slate-200 h-10 w-10 flex justify-center"
        >
          <div className="text-black text-2xl mt-0.5">
            {response.firstName[0].toUpperCase() +
              response.lastName[0].toUpperCase()}
          </div>
        </Link>
      </div>
    </div>
  );
}
