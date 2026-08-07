import React from "react";
import "../../../assets/reports.css";

import {
  Bell,
  AlertCircle,
  FileCheck,
  Clock
} from "lucide-react";


function SystemNotifications({ notifications }) {


return (

<div className="system-notification-card">


<div className="system-notification-title">

<Bell size={20}/>

<div>
<h3>System Notifications</h3>

<p>
Recent report generation activity
</p>
</div>


</div>



<div className="notification-list">

{
notifications && notifications.length > 0 ? (

notifications.map((item,index)=>(

<div 
className="system-notification-row"
key={index}
>

<div className={`notification-status ${item.type}`}>

{
item.type==="warning" ? 
<AlertCircle size={18}/> :
item.type==="success" ?
<FileCheck size={18}/> :
<AlertCircle size={18}/>
}

</div>


<div className="notification-text">

<h4>{item.title}</h4>

<p>{item.message}</p>

</div>


<div className="notification-time">

<Clock size={14}/>

<span>{item.time}</span>

</div>


</div>

))

)
:
(
<div className="no-notification">
No recent notifications
</div>
)
}

</div>


</div>

)

}


export default SystemNotifications;