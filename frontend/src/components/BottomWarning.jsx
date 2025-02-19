import { Link } from "react-router-dom";
export default function BottomWarning({ label, warning, to }) {
  return (
    <div className="flex text-gray-500 justify-center">
      {label}
      <Link className="ml-1 underline" to={to}>
        {warning}
      </Link>
    </div>
  );
}
