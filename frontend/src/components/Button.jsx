export default function Button({ label, onclick }) {
  return (
    <div>
      <button
        onClick={onclick}
        className="bg-black text-white w-full rounded-2xl p-2 my-5 cursor-pointer"
      >
        {label}
      </button>
    </div>
  );
}
