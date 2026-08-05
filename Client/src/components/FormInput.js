function FormInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
}) {
  return (
    <>
      <label className="form-label">
        {label}
      </label>

      <div className="input-group mb-3">

        <span className="input-group-text">
          {icon}
        </span>

        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

      </div>
    </>
  );
}

export default FormInput;