function FormSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {label}
      </label>

      <select
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;