import React, { useEffect, useState } from "react";
import api from "../../../api";

import {
  FileText,
  ShieldCheck,
  CalendarClock,
  ClipboardCheck,
  BarChart3
} from "lucide-react";

import "../../../assets/reportTabs.css";


export default function ReportTabs({
    activeTab,
    setActiveTab
}){


const [counts,setCounts] = useState({});


useEffect(()=>{

    api.get("/api/reports/tab-counts")
    .then((res)=>{
        setCounts(res.data);
    })
    .catch((err)=>{
        console.error(
            "Tab Count Error:",
            err
        );
    });

},[]);



const tabs = [

{
id:"contract",
label:"Contract Reports",
value:counts.contract ?? "-",
icon:FileText
},

{
id:"compliance",
label:"Compliance Reports",
value:counts.compliance ?? "-",
icon:ShieldCheck
},

{
id:"renewal",
label:"Renewal Reports",
value:counts.renewal ?? "-",
icon:CalendarClock
},

{
id:"obligation",
label:"Obligation Reports",
value:counts.obligation ?? "-",
icon:ClipboardCheck
},

{
id:"audit",
label:"Audit Reports",
value:counts.audit ?? "-",
icon:BarChart3
}

];


return (

<div className="report-tabs-container">

{
tabs.map((tab)=>{

const Icon = tab.icon;


return (

<button

key={tab.id}

className={`report-tab ${
activeTab === tab.id ? "active" : ""
}`}

onClick={()=>setActiveTab(tab.id)}

>


<div className="tab-icon">

<Icon size={18}/>

</div>


<div className="tab-content">

<span>
{tab.label}
</span>


<small>
{tab.value}
</small>


</div>


</button>

);

})

}

</div>

);

}