function FormCheckbox({
  checked,
  onChange,
  label,
}) {
  return (
    <div className="form-check">

      <input
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={onChange}
      />

      <label className="form-check-label">
        {label}
      </label>

    </div>
  );
}

export default FormCheckbox;