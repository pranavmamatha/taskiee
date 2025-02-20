import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  return (
    <button
      className="bg-red-600 text-white w-full h-12 rounded-2xl text-center cursor-pointer"
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}
    >
      Logout
    </button>
  );
}
