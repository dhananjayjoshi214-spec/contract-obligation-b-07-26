function PrimaryButton({
  text,
  type = "button",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn btn-primary w-100 py-3 fw-semibold rounded-3"
    >
      {text}
    </button>
  );
}

export default PrimaryButton;