
import React, { useEffect, useState } from "react";
import api from "../../../api";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import {
  FileText,
  ShieldCheck,
  CalendarClock,
  ClipboardCheck,
  BarChart3,
  FileSpreadsheet,
  Eye,
  Download,
  TrendingUp,
  AlertTriangle,
  Users
} from "lucide-react";

import "../../../assets/reports.css";
import RecentReports from "../common/RecentReports";
import Notifications from "../common/Notifications";
import ExportSection from "../common/ExportSection";




function ContractReport({ filters, search, refreshKey }) {
  const [contractMetrics, setContractMetrics] = useState([]);
const [statusData, setStatusData] = useState([]);
const [departmentContracts, setDepartmentContracts] = useState([]);
const [contractTableData, setContractTableData] = useState([]);
const [recentReports, setRecentReports] = useState([]);
const [notifications, setNotifications] = useState([]);
const [currentRole,setCurrentRole]=useState("");
const [accessRoles,setAccessRoles]=useState([]);
const [contractSummary, setContractSummary] = useState([]);
const [pdfOptions, setPdfOptions] = useState([]);
const [excelOptions, setExcelOptions] = useState([]);
const exportPDF = async()=>{

    try{

        const response = await api.get(
            "/api/reports/contracts/export/pdf",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download="contract_report.pdf";

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
            "/api/reports/contracts/export/excel",
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download="contract_report.xlsx";

        link.click();

    }
    catch(error){

        console.error(
            "Excel Export Error:",
            error
        );

    }

};
const fetchContractMetrics = async () => {
  try {
    const response = await api.get("/api/reports/contracts/dashboard-metrics");
    setContractMetrics(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchStatusData = async () => {
  try {
    const response = await api.get("/api/reports/contracts/status");
    console.log("Status:", response.data);
    setStatusData(response.data);
  } catch (error) {
    console.error("Status Error:", error);
  }
};

const fetchDepartmentContracts = async () => {
  try {
    const response = await api.get("/api/reports/contracts/departments");
    console.log("Departments:", response.data);
    setDepartmentContracts(response.data);
  } catch (error) {
    console.error("Department Error:", error);
  }
};

const fetchContractTable = async () => {
  try {
    const response = await api.get("/api/reports/contracts/table", {
  params: {
    ...filters,
    search
  }
});

    setContractTableData(response.data);
  } catch (error) {
    console.error(error);
  }
};
const fetchRecentReports = async () => {
  try {
    const response = await api.get("/api/reports/contracts/recent");
    setRecentReports(response.data);
  } catch (error) {
    console.error("Recent Reports Error:", error);
  }
};
const fetchNotifications = async () => {
  try {
    const response = await api.get("/api/reports/contracts/notifications");
    setNotifications(response.data);
  } catch (error) {
    console.error("Notifications Error:", error);
  }
};
const fetchAccessRoles = async () => {

 try {

 const response = await api.get(
 "/api/reports/contracts/roles"
 );

 setCurrentRole(response.data.current_role);

 setAccessRoles(response.data.roles);

 }
 catch(error){
 console.error("Roles Error:", error);
 }

};
const fetchContractSummary = async () => {
  try {
    const response = await api.get("/api/reports/contracts/summary");
    setContractSummary(response.data);
  } catch (error) {
    console.error("Summary Error:", error);
  }
};
const fetchPdfOptions = async () => {
  try {
    const response = await api.get("/api/reports/contracts/pdf-options");
    setPdfOptions(response.data);
  } catch (error) {
    console.error("PDF Options Error:", error);
  }
};
const fetchExcelOptions = async () => {
  try {
    const response = await api.get("/api/reports/contracts/excel-options");
    setExcelOptions(response.data);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchContractMetrics();
  fetchStatusData();
  fetchDepartmentContracts();
  fetchRecentReports();
  fetchNotifications();
  fetchAccessRoles();
  fetchContractSummary();
  fetchExcelOptions();
  fetchPdfOptions();
}, []);
useEffect(() => {
  fetchContractTable();
}, [filters, search, refreshKey]);
console.log(statusData);
console.log(departmentContracts);
return (

<div className="report-card">





{/* KPI CARDS */}
{contractMetrics.length > 0 && (
  <div className="contract-kpis">
    {contractMetrics.map((item,index)=>(
      <div className={`kpi-card ${item.type}`} key={index}>
        <span className="kpi-change">{item.trend}</span>
        <h3>{item.value}</h3>
        <p>{item.title}</p>
        <small>{item.subtitle}</small>
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
{contractSummary.length > 0 && (
<div className="compliance-summary-grid">

{contractSummary.map((item,index)=>(

<div className={`summary-card ${item.type}`} key={index}>

<div>
<h3>{item.value}</h3>
<p>{item.title}</p>
</div>

</div>

))}

</div>
)}

{/* CONTRACT STATUS CARDS */}




{/* CHART SECTION */}


<div className="contract-analysis">

{statusData.length > 0 && (
<div className="analysis-card">

  <h3>
    Contract Status Distribution
  </h3>

  <p>
    Portfolio breakdown by current status
  </p>

  <ResponsiveContainer width="100%" height={280}>

    <PieChart>

      <Pie
        data={statusData}
        dataKey="value"
        innerRadius={70}
        outerRadius={100}
      >

        {statusData.map((item,index)=>(
          <Cell
            key={index}
            fill={[
              "#22c55e",
              "#f59e0b",
              "#ef4444",
              "#dc2626",
              "#94a3b8"
            ][index]}
          />
        ))}

      </Pie>

      <Tooltip />
      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>
)}




{departmentContracts.length > 0 && (
<div className="analysis-card">

<h3>
Department-wise Contracts
</h3>


<p>
Contract count by department
</p>





<ResponsiveContainer width="100%" height={300}>
  <BarChart
  data={departmentContracts}
  margin={{
    top: 20,
    right: 20,
    left: 10,
    bottom: 20
  }}
>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis
    dataKey="department"
  />

  <YAxis
    allowDecimals={false}
  />

  <Tooltip />

  <Bar
    dataKey="count"
    fill="#2563eb"
    radius={[8, 8, 0, 0]}
  />
</BarChart>
</ResponsiveContainer>



</div>
)}

</div>






{contractTableData.length > 0 && (
<div className="contract-data-table">

<div className="table-header">

  <div>
    <h3>
      Contract Data Table
    </h3>

    <p>
      {contractTableData.length} contracts · Filtered by date range
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
Contract ID
</th>

<th>
Contract Name
</th>

<th>
Vendor
</th>

<th>
Department
</th>

<th>
Start Date
</th>

<th>
End Date
</th>

<th>
Status
</th>

<th>
Actions
</th>

</tr>

</thead>



<tbody>


{
contractTableData.map((item,index)=>(


<tr key={index}>


<td>
{item.id}
</td>


<td>
{item.name}
</td>


<td>
{item.vendor}
</td>


<td>
{item.department}
</td>


<td>
{item.start}
</td>


<td>
{item.end}
</td>


<td>

<span className={`status ${item.status?.toLowerCase() || ""}`}>
{item.status}
</span>

</td>


<td>

<div className="table-actions">
    <Eye size={18} />
    <Download size={18} />
</div>

</td>


</tr>


))
}


</tbody>


</table>


</div>
)}



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



export default ContractReport;