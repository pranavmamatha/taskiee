export default function InputBox({ label, type, placeholder, onchange }) {
  return (
    <div>
      <div className="text-xl my-2">{label}</div>
      <input
        className="border border-solid rounded-sm p-2 w-full"
        type={type}
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
}
