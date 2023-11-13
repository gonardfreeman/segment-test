function Input({ label, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-600">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-1 rounded-md"
      />
    </div>
  );
}

export default Input;
