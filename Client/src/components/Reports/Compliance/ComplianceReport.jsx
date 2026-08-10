import React, { useEffect, useState } from "react";
import api from "../../../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip
} from "recharts";

import "../../../assets/reports.css";
import RecentReports from "../common/RecentReports";
import Notifications from "../common/Notifications";
import ExportSection from "../common/ExportSection";

function ComplianceReport({filters, search, refreshKey}){
const [contractMetrics, setContractMetrics] = useState([]);
const [summary, setSummary] = useState([]);
const [statusData, setStatusData] = useState([]);
const [departments, setDepartments] = useState([]);
const [tableData, setTableData] = useState([]);
const [recentReports, setRecentReports] = useState([]);
const [notifications, setNotifications] = useState([]);
const [roles, setRoles] = useState([]);
const [monthlyComplianceTrend, setMonthlyComplianceTrend] = useState([]);
const [pdfOptions, setPdfOptions] = useState([]);
const [excelOptions, setExcelOptions] = useState([]);
const [currentRole,setCurrentRole]=useState("");
const [accessRoles,setAccessRoles]=useState([]);
const exportPDF = async()=>{

    try{

        const response = await api.get(
            "/api/reports/compliance/export/pdf",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download="compliance_report.pdf";

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
            "/api/reports/compliance/export/excel",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download="compliance_report.xlsx";

        link.click();

    }
    catch(error){

        console.error(
            "Excel Export Error:",
            error
        );

    }

};
// Dashboard Metrics
const fetchComplianceMetrics = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/dashboard-metrics"
    );
    setContractMetrics(response.data);
  } catch (error) {
    console.error("Metrics Error:", error);
  }
};

// Summary Cards
const fetchSummary = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/summary"
    );
    setSummary(response.data);
  } catch (error) {
    console.error("Summary Error:", error);
  }
};
const fetchAccessRoles = async () => {

try {

const response = await api.get(
"/api/reports/compliance/roles"
);

setCurrentRole(response.data.current_role);

setAccessRoles(response.data.roles);

}
catch(error){
console.error(error);
}

};
// Department Chart
const fetchDepartments = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/departments"
    );
    setDepartments(response.data);
  } catch (error) {
    console.error("Department Error:", error);
  }
};

// Monthly Trend
const fetchComplianceTrend = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/trends"
    );
    setMonthlyComplianceTrend(response.data);
  } catch (error) {
    console.error("Trend Error:", error);
  }
};

// Table Data
const fetchComplianceTable = async () => {
  try {
    const response = await api.get(
    "/api/reports/compliance/table",
    {
        params:{
            ...filters,
            search: search
        }
    }
);
    setTableData(response.data);
  } catch (error) {
    console.error("Table Error:", error);
  }
};

// Recent Reports
const fetchRecentReports = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/recent"
    );
    setRecentReports(response.data);
  } catch (error) {
    console.error("Recent Reports Error:", error);
  }
};

// Notifications
const fetchNotifications = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/notifications"
    );
    setNotifications(response.data);
  } catch (error) {
    console.error("Notifications Error:", error);
  }
};

// Roles
const fetchRoles = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/roles"
    );
    setRoles(response.data);
  } catch (error) {
    console.error("Roles Error:", error);
  }
};

// PDF Options
const fetchPdfOptions = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/pdf-options"
    );
    setPdfOptions(response.data);
  } catch (error) {
    console.error("PDF Options Error:", error);
  }
};

// Excel Options
const fetchExcelOptions = async () => {
  try {
    const response = await api.get(
      "/api/reports/compliance/excel-options"
    );
    setExcelOptions(response.data);
  } catch (error) {
    console.error("Excel Options Error:", error);
  }
};
useEffect(() => {
  fetchComplianceMetrics();
  fetchSummary();
  fetchDepartments();
  fetchComplianceTrend();
  fetchRecentReports();
  fetchNotifications();
  fetchRoles();
  fetchAccessRoles();
  fetchPdfOptions();
  fetchExcelOptions();
  fetchComplianceTable();
}, [search, refreshKey, filters]);

return(

<div className="report-card">


<div className="report-card-header">

<h2>
Compliance Report
</h2>

<p>
Overall compliance status and contract monitoring
</p>

</div>


{/* KPI CARDS */}
{contractMetrics.length > 0 && (
  <div className="contract-kpis">
    {contractMetrics.map((item, index) => (
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
    ))}
  </div>
)}
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
(departments.length > 0 || monthlyComplianceTrend.length > 0) && (

<div className="compliance-analysis-grid">

{/* Department Compliance */}

<div className="analysis-card">

<h3>
Compliance by Department
</h3>

<p>
Task completion rate per department
</p>

{departments.map((dept, index) => (

  <div className="department-row" key={index}>

    <div className="department-header">

      <span>{dept.department}</span>

      <span>{dept.rate}%</span>

    </div>

    <div className="progress-bar">

      <div
        className="progress-fill"
        style={{ width: `${dept.rate}%` }}
      ></div>

    </div>

  </div>

))}
</div>





{/* Monthly Trend */}

<div className="analysis-card">

<h3>
Monthly Compliance Trend
</h3>

<p>
Monthly compliance performance trend
</p>


<ResponsiveContainer width="100%" height={320}>


<LineChart data={monthlyComplianceTrend}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis 
dataKey="month"
/>


<YAxis 
domain={[0,100]}
/>


<Tooltip/>


<Line

type="monotone"

dataKey="rate"

stroke="#16a34a"

strokeWidth={3}

dot={{r:5}}

/>


</LineChart>


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
Obligation Compliance Table
</h3>

<p>
Green = Completed · Orange = Pending · Red = Overdue
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
Obligation
</th>

<th>
Due Date
</th>

<th>
Assigned To
</th>

<th>
Status
</th>

<th>
Completion Date
</th>

</tr>

</thead>



<tbody>


{
tableData.map((item,index)=>(

<tr key={index}>


<td>
{item.obligation}
</td>


<td>
{item.dueDate}
</td>


<td>

<div className="assigned-user">

<span>
{item.initials}
</span>

{item.assigned}

</div>

</td>



<td>

<span className={`obligation-status ${item.status.toLowerCase().replace(" ","-")}`}>

{item.status}

</span>

</td>



<td>
{item.completion}
</td>


</tr>

))

}


</tbody>


</table>

</div>

)
}


{
(pdfOptions.length > 0 || excelOptions.length > 0) && (

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


export default ComplianceReport;