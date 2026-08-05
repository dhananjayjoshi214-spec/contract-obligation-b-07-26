function RecentNotifications() {

  const notifications = [

    "Contract expires tomorrow",

    "New employee registered",

    "Pending approval request",

    "Password updated",

    "Renewal due in 2 days",

  ];

  return (

    <div className="card shadow-sm border-0 p-3">

      <h5 className="mb-3">

        Latest Notifications

      </h5>

      <ul className="list-group list-group-flush">

        {notifications.map((item, index) => (

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

export default RecentNotifications;