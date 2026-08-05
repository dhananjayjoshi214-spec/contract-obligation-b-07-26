function Loading() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light"
    >
      <div
        className="spinner-border text-primary"
        style={{
          width: "4rem",
          height: "4rem",
        }}
      ></div>

      <h3 className="mt-4">
        Loading...
      </h3>

      <p className="text-secondary">
        Please wait...
      </p>
    </div>
  );
}

export default Loading;