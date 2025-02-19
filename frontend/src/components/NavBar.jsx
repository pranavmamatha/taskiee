import { Link } from "react-router-dom";

export default function NavBar() {
  const data = {
    firstName: "first",
    lastName: "last",
    tasks: 100,
    completed: 50,
    pending: 50,
  };

  return (
    <div className="flex justify-between bg-black text-white p-3 rounded-2xl m-5">
      <Link to={"/dashboard"} className="text-3xl ml-5 text-center">
        Taskiee
      </Link>
      <div className="flex">
        <div className="flex mr-5 text-xl">
          <div className="mr-2">Tasks: {data.tasks}</div>
          <div className="mr-2">completed: {data.completed}</div>
          <div className="mr-2">pending: {data.pending}</div>
        </div>
        <Link
          to="/profile"
          className="rounded-full bg-slate-200 h-10 w-10 flex justify-center"
        >
          <div className="text-black text-2xl mt-1">
            {data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase()}
          </div>
        </Link>
      </div>
    </div>
  );
}
