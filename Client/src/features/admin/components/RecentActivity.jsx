function RecentActivity() {

  const activities = [

    "Rahul approved Contract #102",

    "Priya created new obligation",

    "Mahesh updated user profile",

    "Admin deleted expired contract",

    "Amit renewed Contract #205",

  ];

  return (

    <div className="card shadow-sm border-0 p-3">

      <h5 className="mb-3">

        Recent Activities

      </h5>

      <ul className="list-group list-group-flush">

        {activities.map((item, index) => (

          <li
            key={index}
            className="list-group-item"
          >

            {item}

          </li>

        ))}

      </ul>

    </div>

  );

}

export default RecentActivity;