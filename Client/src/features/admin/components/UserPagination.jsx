function UserPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-4">

      <button
        className="btn btn-outline-primary"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
      >
        Previous
      </button>

      <div>

        {Array.from(
          { length: totalPages },
          (_, index) => (

            <button
              key={index}
              className={`btn mx-1 ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>

          )
        )}

      </div>

      <button
        className="btn btn-outline-primary"
        disabled={
          currentPage === totalPages ||
          totalPages === 0
        }
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
      >
        Next
      </button>

    </div>
  );
}

export default UserPagination;