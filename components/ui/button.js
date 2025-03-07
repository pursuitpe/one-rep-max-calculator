export function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-bold ${className}`}
    >
      {children}
    </button>
  );
}
