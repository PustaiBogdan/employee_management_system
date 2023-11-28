export function Button({ onClick, label }) {
  return (
    <a
      className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4"
      onClick={onClick}
    >
      {label}
    </a>
  );
}
