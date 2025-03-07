export function Switch({ checked, onCheckedChange, className }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="hidden"
      />
      <span className={`w-10 h-5 flex items-center rounded-full p-1 transition ${checked ? 'bg-blue-600' : 'bg-gray-300'} ${className}`}>
        <span className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${checked ? 'translate-x-5' : 'translate-x-0'}`}></span>
      </span>
    </label>
  );
}
