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


function AuditReport({filters, search, refreshKey}){

const [auditTrailData, setAuditTrailData] = useState([]);
const [auditMetrics, setAuditMetrics] = useState([]);
const [auditSummary, setAuditSummary] = useState([]);
const [auditTimeline, setAuditTimeline] = useState([]);
const [dailyAuditActivity, setDailyAuditActivity] = useState([]);

const [auditReports, setAuditReports] = useState([]);  // ADD THIS
const [currentRole,setCurrentRole]=useState("");
const [accessRoles,setAccessRoles]=useState([]);
const [recentReports, setRecentReports] = useState([]);
const [notifications, setNotifications] = useState([]);
const [pdfOptions, setPdfOptions] = useState([]);
const [excelOptions, setExcelOptions] = useState([]);
const exportPDF = async()=>{

    try{

        const response = await api.get(
            "/api/reports/audit/export/pdf",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;
        link.download="audit_report.pdf";

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
            "/api/reports/audit/export/excel",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;
        link.download="audit_report.xlsx";

        link.click();

    }
    catch(error){

        console.error(
            "Excel Export Error:",
            error
        );

    }

};
const fetchAuditMetrics = async () => {
  try {
    const response = await api.get("/api/reports/audit/dashboard-metrics");

    console.log("Audit Metrics:", response.data);

    setAuditMetrics(response.data);

  } catch (error) {
    console.error("Metrics Error:", error);
  }
};

const fetchAuditTrail = async () => {
  try {
    const response = await api.get("/api/reports/audit/trail");
    console.log("Trail Response:", response.data);
    setAuditTrailData(response.data);
  } catch (error) {
    console.error("Trail Error:", error);
  }
};
const fetchAccessRoles = async () => {

try {

const response = await api.get(
"/api/reports/audit/roles"
);

setCurrentRole(response.data.current_role);

setAccessRoles(response.data.roles);

}
catch(error){
console.error(error);
}

};
const fetchAuditSummary = async () => {
  try {
    const response = await api.get("/api/reports/audit/summary");
    setAuditSummary(response.data);
  } catch (error) {
    console.error("Summary Error:", error);
  }
};
const fetchAuditTimeline = async () => {
  try {
    const response = await api.get("/api/reports/audit/timeline");
    setAuditTimeline(response.data);
  } catch (error) {
    console.error("Timeline Error:", error);
  }
};
const fetchAuditReports = async () => {
  try {

    const response = await api.get("/api/reports/audit/list");

    console.log("Audit Reports:", response.data);

    setAuditReports(response.data);

  } catch(error){

    console.error("Audit Reports Error:", error);

  }
};
const fetchDailyActivity = async () => {
  try {
    const response = await api.get("/api/reports/audit/activity");
    setDailyAuditActivity(response.data);
  } catch (error) {
    console.error("Activity Error:", error);
  }
};
const fetchHeaderData = async () => {
  try {
    const response = await api.get("/api/reports/header");

    setUser(response.data.user);
    setNotificationCount(response.data.notification_count);

  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchAuditMetrics();
  fetchAuditSummary();
  fetchAuditTrail();
  fetchHeaderData();
  fetchAuditTimeline();
  fetchDailyActivity();
  fetchAccessRoles();
    fetchAuditReports();
  api.get("/api/reports/audit/recent")
    .then(res => setRecentReports(res.data))
    .catch(err => console.error(err));

  api.get("/api/reports/audit/notifications")
    .then(res => setNotifications(res.data))
    .catch(err => console.error(err));

  api.get("/api/reports/audit/pdf-options")
  .then(res => setPdfOptions(res.data))
  .catch(err => console.error(err));

api.get("/api/reports/audit/excel-options")
  .then(res => setExcelOptions(res.data))
  .catch(err => console.error(err));

}, []);
console.log(pdfOptions);
console.log(excelOptions);
return(

<div className="report-card">



<div className="report-card-header">

<h2>
Audit Report
</h2>

<p>
Audit activities, findings and compliance monitoring
</p>

</div>





{/* KPI CARDS */}
{
auditMetrics.length > 0 && (

<div className="contract-kpis">


{
auditMetrics.map((item,index)=>(

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
auditSummary.length > 0 && (

<div className="compliance-summary-grid">

{
auditSummary.map((item,index)=>(

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


{/* TIMELINE + BAR CHART SIDE BY SIDE */}
{(auditTimeline.length > 0 || dailyAuditActivity.length > 0) && (

  <div className="compliance-analysis-grid">

    {auditTimeline.length > 0 && (
      <div className="timeline-card">

        <h3>Recent Activity Timeline</h3>
        <p>Latest audit events in chronological order</p>

        <div className="timeline">
          {auditTimeline.map((item, index) => (
            <div className="timeline-item" key={index}>

              <div className="timeline-avatar">
                {item.user
                  ?.split(" ")
                  .map(word => word[0])
                  .join("")}
              </div>

              <div className="timeline-content">
                <h4>{item.user}</h4>
                <p>{item.action}</p>
              </div>

              <span className="timeline-time">
                {item.time}
              </span>

            </div>
          ))}
        </div>

      </div>
    )}

    {dailyAuditActivity.length > 0 && (
      <div className="analysis-card">

        <h3>Daily Audit Activity</h3>
        <p>Number of audit events per day</p>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={dailyAuditActivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="events"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>
    )}

  </div>

)}
{/* FULL AUDIT TRAIL TABLE */}
{
auditTrailData.length > 0 && (

<div className="obligation-table-card">

<div className="table-header">

<div>

<h3>
Full Audit Trail Table
</h3>

<p>
All system actions with user, module, and IP tracking
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
Timestamp
</th>

<th>
User
</th>

<th>
Module
</th>

<th>
Action
</th>

<th>
Previous Value
</th>

<th>
Updated Value
</th>

<th>
IP Address
</th>

</tr>

</thead>



<tbody>


{
auditTrailData.map((item,index)=>(

<tr key={index}>


<td>
{item.timestamp}
</td>


<td>
{item.user}
</td>


<td>
{item.module}
</td>


<td>

<span className="obligation-status completed">

{item.action}

</span>

</td>


<td>
{item.previous}
</td>


<td>
{item.updated}
</td>


<td>
{item.ip}
</td>


</tr>

))

}


</tbody>


</table>

</div>  
)
}

{/* EXPORT SECTION */}
{(pdfOptions.length > 0 || excelOptions.length > 0) && (
 <ExportSection
    pdfOptions={pdfOptions}
    setPdfOptions={setPdfOptions}
    excelOptions={excelOptions}
    setExcelOptions={setExcelOptions}
    exportPDF={exportPDF}
    exportExcel={exportExcel}
/>
)}


{
  recentReports.length > 0 && (
    <RecentReports reports={recentReports} />
  )
}

{
  notifications.length > 0 && (
    <Notifications notifications={notifications} />
  )
}

</div>
);

}

export default AuditReport;