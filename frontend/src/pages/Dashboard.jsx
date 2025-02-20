import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Task from "../components/Task";
import axios from "axios";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import PositiveWarning from "../components/PositiveWarning";
import Warning from "../components/Warning";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [warning, setWarning] = useState("");
  const [positiveWarning, setPositiveWarning] = useState("");
  const [reload, setReload] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
      return;
    }
    axios
      .get("https://taskiee-production.up.railway.app/api/v1/task/tasks", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload, navigate]);

  return (
    <div className="p-7">
      <NavBar />
      <div className="mt-5">
        <div className="border border-solid rounded-2xl px-10 pt-5 pb-3">
          <InputBox
            label={"Title"}
            type={"text"}
            placeholder={"Title"}
            onchange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <InputBox
            label={"Description"}
            type={"text"}
            placeholder={"Description...."}
            onchange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Button
            label={"Create"}
            onclick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/task/create",
                {
                  title: title,
                  description: description,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              console.log(response.data.message);
              if (response.data.message != "failed to create a task") {
                setReload(Math.random());
                setPositiveWarning(response.data.message);
                setTimeout(() => {
                  setPositiveWarning("");
                }, 5000);
              } else {
                setWarning(response.data.message);
                setTimeout(() => {
                  setWarning("");
                }, 5000);
              }
            }}
          />
          <Warning label={warning} />
          <PositiveWarning label={positiveWarning} />
        </div>
        <div className="border border-solid rounded-2xl w-full mt-5">
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                taskId={task._id}
                title={task.title}
                completed={task.completed}
                description={task.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
