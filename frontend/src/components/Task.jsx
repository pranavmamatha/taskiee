import { useState } from "react";
import axios from "axios";
import Warning from "./Warning";
import PositiveWarning from "./PositiveWarning";

export default function Task({ taskId, title, description, completed }) {
  const [finished, setFinished] = useState(completed);
  const [warning, setWarning] = useState("");
  const [positiveWarning, setPositiveWarning] = useState("");
  async function onClick(check) {
    const response = await axios.put(
      `https://taskiee-production.up.railway.app/api/v1/task/update?update=${taskId}`,
      {
        completed: check,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return [
      response.data.message == "Updated successfully" ? true : false,
      response.data.message,
    ];
  }

  return (
    <div>
      <div className="flex justify-between border border-solid rounded-2xl p-2 m-3">
        <div className="flex justify-between">
          <input
            type="checkbox"
            className="accent-black w-5 h-5 border-black mr-3 mt-1.5 mb-2 ml-5"
            onChange={async () => {
              const x = await onClick(!finished);
              if (x[0]) {
                setFinished(!finished);
                setPositiveWarning(x[1]);
                setTimeout(() => [setPositiveWarning("")], 5000);
              } else {
                setWarning(x[1]);
                setTimeout(() => [setWarning("")], 5000);
              }
            }}
            checked={finished}
          />
          <div className="text-xl">{title}</div>
        </div>
        <details className="cursor-pointer">
          <summary>View Description</summary>
          <div className="mt-2">{description}</div>
        </details>
      </div>
      <div>
        <PositiveWarning label={positiveWarning} />
        <Warning label={warning} />
      </div>
    </div>
  );
}
