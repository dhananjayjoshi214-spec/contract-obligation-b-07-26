function UpcomingRenewals() {

  const renewals = [

    {
      contract: "Contract ABC",
      due: "Tomorrow",
    },

    {
      contract: "Contract XYZ",
      due: "2 Days",
    },

    {
      contract: "Contract PQR",
      due: "Next Week",
    },

  ];

  return (

    <div className="card shadow-sm border-0 p-3">

      <h5 className="mb-3">

        Upcoming Renewals

      </h5>

      <table className="table">

        <thead>

          <tr>

            <th>Contract</th>

            <th>Due</th>

          </tr>

        </thead>

        <tbody>

          {renewals.map((item, index) => (

            <tr key={index}>

              <td>{item.contract}</td>

              <td>{item.due}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default UpcomingRenewals;