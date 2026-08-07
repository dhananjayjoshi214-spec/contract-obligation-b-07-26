import React, { useEffect, useState } from "react";
import api from "../../../api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "../../../assets/reports.css";

import RecentReports from "../common/RecentReports";
import Notifications from "../common/Notifications";
import ExportSection from "../common/ExportSection";


function RenewalReport({filters, search, refreshKey}){

const [renewalMetrics,setRenewalMetrics] = useState([]);
const [summary, setSummary] = useState([]);
const [trend, setTrend] = useState([]);
const [calendarData, setCalendarData] = useState([]);
const [tableData, setTableData] = useState([]);
const [recentReports, setRecentReports] = useState([]);
const [notifications, setNotifications] = useState([]);
const [pdfOptions, setPdfOptions] = useState([]);
const [excelOptions, setExcelOptions] = useState([]);
const [currentRole,setCurrentRole]=useState("");
const [accessRoles,setAccessRoles]=useState([]);

useEffect(() => {
  
const fetchAccessRoles = async () => {

try {

const response = await api.get(
"/api/reports/renewal/roles"
);

setCurrentRole(response.data.current_role);

setAccessRoles(response.data.roles);

}
catch(error){
console.error(error);
}

};
fetchAccessRoles();
    api.get("/api/reports/renewal/dashboard-metrics")
.then(res => {
    console.log(res.data);
    setRenewalMetrics(res.data);
})
.catch(err => console.error(err));

    api.get("/api/reports/renewal/summary")
        .then(res => setSummary(res.data))
        .catch(err => console.error(err));
     

    api.get("/api/reports/renewal/trend")
        .then(res => setTrend(res.data))
        .catch(err => console.error(err));
    api.get("/api/reports/renewal/calendar")
.then(res => setCalendarData(res.data))
.catch(err => console.error(err));

    api.get("/api/reports/renewal/table")
        .then(res => setTableData(res.data))
        .catch(err => console.error(err));

    api.get("/api/reports/renewal/recent")
        .then(res => setRecentReports(res.data))
        .catch(err => console.error(err));
    api.get("/api/reports/renewal/pdf-options")
.then(res => setPdfOptions(res.data))
.catch(err => console.error(err));

api.get("/api/reports/renewal/excel-options")
.then(res => setExcelOptions(res.data))
.catch(err => console.error(err));

    api.get("/api/reports/renewal/notifications")
        .then(res => setNotifications(res.data))
        .catch(err => console.error(err));
}, []);
const exportPDF = async()=>{

    try{

        const response = await api.get(
            "/api/reports/renewal/export/pdf",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download="renewal_report.pdf";

        link.click();

    }
    catch(error){

        console.error(
            "PDF Export Error:",
            error
        );

    }

};



const exportExcel = async()=>{

    try{

        const response = await api.get(
            "/api/reports/renewal/export/excel",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download="renewal_report.xlsx";

        link.click();

    }
    catch(error){

        console.error(
            "Excel Export Error:",
            error
        );

    }

};
return(

<div className="report-card">



<div className="report-card-header">

<h2>
Renewal Report
</h2>

<p>
Contract renewal tracking and risk analysis
</p>

</div>




{/* KPI CARDS */}

{
renewalMetrics.length > 0 && (

<div className="contract-kpis">


{
renewalMetrics.map((item, index) => (

<div
className={`kpi-card ${item.type}`}
key={index}
>


<span className="kpi-change">

{item.trend}

</span>


<h3>

{item.value}

</h3>


<p>

{item.title}

</p>


<small>

{item.subtitle}

</small>


</div>

))

}


</div>

)
}

{/* ROLE ACCESS */}

{accessRoles.length > 0 && (
  <div className="role-access-card">

    <div className="role-header">
      <div>
        <h3>Role-Based Report Access</h3>

        <p>
          Your current access level:
          <strong> {currentRole}</strong>
        </p>
      </div>
    </div>

    <div className="role-list">

      {accessRoles.map((item, index) => (

        <div
          key={index}
          className={`role-item ${item.role
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >

          <span className="role-name">
            {item.role}
          </span>

          <span className="role-access">
            {item.access}
          </span>

        </div>

      ))}

    </div>

  </div>
)}

{/* SUMMARY CARDS */}


{
summary.length > 0 && (

<div className="compliance-summary-grid">


{
summary.map((item,index)=>(

<div
className={`summary-card ${item.type}`}
key={index}
>


<div className="summary-icon">

{item.icon}

</div>


<div>

<h3>

{item.value}

</h3>


<p>

{item.title}

</p>


</div>


</div>

))

}


</div>

)
}
{/* RENEWAL TIMELINE + VOLUME */}
<div className="renewal-analysis-grid">

{
calendarData.length > 0 && (
<div className="analysis-card">

<h3>
Renewal Timeline
</h3>

<p>
Upcoming contract renewal dates
</p>

<div className="renewal-calendar">

<div className="calendar-header">
<span>Su</span>
<span>Mo</span>
<span>Tu</span>
<span>We</span>
<span>Th</span>
<span>Fr</span>
<span>Sa</span>
</div>


<div className="calendar-grid">

{
calendarData.map((item,index)=>(

<div
className={`calendar-day ${item.status}`}
key={index}
>

<span>{item.day}</span>

<small>{item.company}</small>

</div>

))
}

</div>

</div>


<div className="calendar-legend">

<span>
<i className="expired"></i>
Expired
</span>

<span>
<i className="due"></i>
Due Soon
</span>

<span>
<i className="upcoming"></i>
Upcoming
</span>

<span>
<i className="renewed"></i>
Renewed
</span>

</div>


</div>
)
}



{
trend.length > 0 && (

<div className="analysis-card">

<h3>
Monthly Renewal Volume
</h3>

<p>
Number of renewals processed per month
</p>


<ResponsiveContainer width="100%" height={320}>

<BarChart data={trend}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="renewals"
fill="#2563eb"
radius={[8,8,0,0]}
/>

</BarChart>

</ResponsiveContainer>


</div>

)
}


</div>


{/* RENEWAL CONTRACTS TABLE */}
{
tableData.length > 0 && (

<div className="obligation-table-card">


<div className="table-header">


<div>

<h3>
Renewal Contracts Table
</h3>


<p>
Priority badges: Critical · High · Medium · Low
</p>


</div>


<div className="export-buttons">


<button
className="secondary-btn"
onClick={exportPDF}
>
PDF
</button>



<button
className="success-btn"
onClick={exportExcel}
>
Excel
</button>


</div>


</div>



<table>


<thead>

<tr>

<th>
Contract
</th>

<th>
Vendor
</th>

<th>
Renewal Date
</th>

<th>
Reminder Sent
</th>

<th>
Priority
</th>

<th>
Renewal Status
</th>

</tr>

</thead>



<tbody>


{
tableData.map((item,index)=>(

<tr key={index}>


<td>
{item.contract}
</td>


<td>
{item.vendor}
</td>


<td>
{item.date}
</td>


<td>
{item.reminder}
</td>


<td>

<span 
className={`priority-badge ${item.priority.toLowerCase()}`}
>

{item.priority}

</span>

</td>



<td>

<span 
className={`renewal-status ${item.status.toLowerCase().replace(/\s+/g, "-")}`}
>

{item.status}

</span>

</td>


</tr>

))

}


</tbody>


</table>


</div>

)
}


{/* COMMON SECTIONS */}
<ExportSection
    pdfOptions={pdfOptions}
    setPdfOptions={setPdfOptions}
    excelOptions={excelOptions}
    setExcelOptions={setExcelOptions}
    exportPDF={exportPDF}
    exportExcel={exportExcel}
/>

{
recentReports.length > 0 &&
<RecentReports reports={recentReports}/>
}


{
notifications.length > 0 &&
<Notifications notifications={notifications}/>
}





</div>

);

}


export default RenewalReport;