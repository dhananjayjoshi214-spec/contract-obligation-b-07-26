import React, { useEffect, useState } from "react";
import api from "../../../api";

import {
  PieChart,
  Pie,
  Cell,
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




function ObligationReport({filters, search, refreshKey}){
const [contractMetrics, setContractMetrics] = useState([]);
const [summary, setSummary] = useState([]);
const [statusData, setStatusData] = useState([]);
const [categories, setCategories] = useState([]);
const [tableData, setTableData] = useState([]);
const [recentReports, setRecentReports] = useState([]);
const [notifications, setNotifications] = useState([]);
const [pdfOptions, setPdfOptions] = useState([]);
const [excelOptions, setExcelOptions] = useState([]);
const [currentRole,setCurrentRole]=useState("");
const [accessRoles,setAccessRoles]=useState([]);
const exportPDF = async()=>{

    try{

        const response = await api.get(
            "/api/reports/obligation/export/pdf",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download="obligation_report.pdf";

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
            "/api/reports/obligation/export/excel",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download="obligation_report.xlsx";

        link.click();

    }
    catch(error){

        console.error(
            "Excel Export Error:",
            error
        );

    }

};

useEffect(() => {
  const fetchAccessRoles = async () => {

    try {

        const response = await api.get(
            "/api/reports/obligation/roles"
        );

        setCurrentRole(response.data.current_role);
        setAccessRoles(response.data.roles);

    }
    catch(error){
        console.error(error);
    }

};


fetchAccessRoles();

    api.get("/api/reports/obligation/dashboard-metrics")
        .then(res => {
            console.log(res.data); // Check the response
            setContractMetrics(res.data);
        })
        .catch(err => console.error(err));

    api.get("/api/reports/obligation/summary")
        .then(res => setSummary(res.data));

    api.get("/api/reports/obligation/status")
.then(res => {

    console.log("OBLIGATION STATUS RESPONSE:", res.data);

    setStatusData(res.data);

})
.catch(err => console.error("STATUS ERROR:", err));

    api.get("/api/reports/obligation/categories")
.then(res => {
    console.log("Category Progress:", res.data);
    setCategories(res.data);
})
.catch(err => console.error(err));

    api.get("/api/reports/obligation/table")
        .then(res => setTableData(res.data));

    api.get("/api/reports/obligation/recent")
        .then(res => setRecentReports(res.data));
        api.get("/api/reports/obligation/pdf-options")
  .then(res => setPdfOptions(res.data))
  .catch(err => console.error(err));

api.get("/api/reports/obligation/excel-options")
  .then(res => setExcelOptions(res.data))
  .catch(err => console.error(err));

    api.get("/api/reports/obligation/notifications")
        .then(res => setNotifications(res.data));

}, []);

return(

<div className="report-card">



<div className="report-card-header">

<h2>
Obligation Report
</h2>

<p>
Contract obligation tracking and compliance monitoring
</p>

</div>





{/* KPI CARDS */}
{
contractMetrics.length > 0 && (

<div className="contract-kpis">

{
contractMetrics.map((item,index)=>(

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

{

statusData.length > 0 && (

<div className="compliance-analysis-grid">
{/* DONUT CHART */}

<div className="analysis-card">

<h3>
Obligation Status Donut
</h3>

<p>
Overall obligation completion breakdown
</p>
<ResponsiveContainer width="100%" height={320}>

<PieChart>

<Pie
data={statusData}
dataKey="value"
nameKey="name"
innerRadius={70}
outerRadius={110}
paddingAngle={3}
>

{
statusData.map((item,index)=>(

<Cell
key={index}
fill={
 item.name === "Completed"
 ? "#22c55e"
 : item.name === "Pending"
 ? "#f59e0b"
 : item.name === "In Progress"
 ? "#3b82f6"
 : "#ef4444"
}
/>

))

}

</Pie>

<Tooltip
formatter={(value,name)=>{
    return [
        value,
        name
    ];
}}
/>

</PieChart>

</ResponsiveContainer>



</div>





{/* CATEGORY PROGRESS */}

<div className="analysis-card">

<h3>
Obligation Progress by Category
</h3>


<p>
Completion rate per obligation category
</p>


<ResponsiveContainer width="100%" height={320}>

<BarChart
data={categories}
layout="vertical"
margin={{
    top:10,
    right:30,
    left:80,
    bottom:10
}}
>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis
type="number"
domain={[0,100]}
/>


<YAxis
type="category"
dataKey="category"
/>


<Tooltip/>


<Bar
    dataKey="progress"
    radius={[0,8,8,0]}
>
{
categories.map((item,index)=>(
    <Cell
        key={index}
        fill={
            [
                "#2563eb", // Blue
                "#16a34a", // Green
                "#f59e0b", // Orange
                "#9333ea"  // Purple
            ][index % 4]
        }
    />
))
}
</Bar>

</BarChart>

</ResponsiveContainer>


</div>


</div>

)
}


{
tableData.length > 0 && (

<div className="obligation-table-card">


<div className="table-header">


<div>

<h3>
Obligation Tracking Table
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
Obligation ID
</th>

<th>
Description
</th>

<th>
Assigned To
</th>

<th>
Due Date
</th>

<th>
Priority
</th>

<th>
Status
</th>

</tr>

</thead>

<tbody>

{
tableData.map((item,index)=>(

<tr key={index}>

<td>
{item.id}
</td>


<td>
{item.description}
</td>


<td>
{item.assigned}
</td>


<td>
{item.date}
</td>


<td>

<span className={`priority-badge ${item.priority.toLowerCase()}`}>
{item.priority}
</span>

</td>


<td>

<span className={`renewal-status ${item.status.toLowerCase().replace(/\s+/g, "-")}`}>
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





{/* EXPORT */}
{
(tableData.length > 0 || statusData.length > 0) && (

<ExportSection
    pdfOptions={pdfOptions}
    setPdfOptions={setPdfOptions}
    excelOptions={excelOptions}
    setExcelOptions={setExcelOptions}
    exportPDF={exportPDF}
    exportExcel={exportExcel}
/>

)
}

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


export default ObligationReport;