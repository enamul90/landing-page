export default function Input({
  LabelName = "Input",
  Placeholder = "input",
  value,
  onChange,
}) {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor="input"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {LabelName}
      </label>
      <input
        value={value} // parent state
        onChange={(e) => onChange(e.target.value)} // call parent's onChange
        placeholder={Placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        aria-describedby="input-field"
      />
    </div>
  );
}