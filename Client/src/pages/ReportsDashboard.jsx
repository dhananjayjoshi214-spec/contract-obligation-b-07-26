import { useState } from "react";
import "../assets/reports.css";
import api from "../api";

import Sidebar from "../layouts/Sidebar";

import DashboardTopHeader from "../components/Reports/common/DashboardTopHeader";
import ReportHeader from "../components/Reports/common/ReportHeader";
import ReportTabs from "../components/Reports/common/ReportTabs";
import FilterSidebar from "../components/Reports/common/FilterSidebar";

import ContractReport from "../components/Reports/Contract/ContractReport";
import ComplianceReport from "../components/Reports/Compliance/ComplianceReport";
import RenewalReport from "../components/Reports/Renewal/RenewalReport";
import ObligationReport from "../components/Reports/Obligation/ObligationReport";
import AuditReport from "../components/Reports/Audit/AuditReport";

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState("contract");
const [filters, setFilters] = useState({});
const [showFilters, setShowFilters] = useState(true);
const [search, setSearch] = useState("");
const [refreshKey, setRefreshKey] = useState(0);
const refreshData = () => {
    setRefreshKey(prev => prev + 1);
};
const handleSearch = () => {
    setRefreshKey(prev => prev + 1);
};

const exportRoutes = {
    contract: "contracts",
    compliance: "compliance",
    renewal: "renewal",
    obligation: "obligation",
    audit: "audit"
};
const exportPDF = async () => {

    try {

        const report = exportRoutes[activeTab];

        const response = await api.get(
            `/api/reports/${report}/export/pdf`,
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link = document.createElement("a");

        link.href = url;

        link.download = `${activeTab}_report.pdf`;

        link.click();


    } catch(error){

        console.error(
            "PDF Export Error:",
            error
        );

    }

};


const exportExcel = async () => {

    try {

        const report = exportRoutes[activeTab];


        const response = await api.get(
            `/api/reports/${report}/export/excel`,
            {
                responseType:"blob"
            }
        );


        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );


        const link=document.createElement("a");

        link.href=url;

        link.download=`${activeTab}_report.xlsx`;

        link.click();


    } catch(error){

        console.error(
            "Excel Export Error:",
            error
        );

    }

};

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="reports-dashboard">

    <DashboardTopHeader />

    <ReportHeader
    showFilters={showFilters}
    setShowFilters={setShowFilters}
    search={search}
    setSearch={setSearch}
    onRefresh={refreshData}
    onExportPDF={exportPDF}
    onExportExcel={exportExcel}
    onSearch={handleSearch}
/>

    <ReportTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
    />

    <div className="reports-layout">

       {showFilters && (
    <FilterSidebar onApplyFilters={setFilters} />
)}

        <div className="reports-content">

            {activeTab === "contract" && (
  <ContractReport
    filters={filters}
    search={search}
    refreshKey={refreshKey}
/>
)}
{activeTab === "compliance" && (
  <ComplianceReport 
      filters={filters}
      search={search}
      refreshKey={refreshKey}
  />
)}

{activeTab === "renewal" && (
  <RenewalReport 
      filters={filters}
      search={search}
      refreshKey={refreshKey}
  />
)}

{activeTab === "obligation" && (
  <ObligationReport 
      filters={filters}
      search={search}
      refreshKey={refreshKey}
  />
)}

{activeTab === "audit" && (
  <AuditReport 
      filters={filters}
      search={search}
      refreshKey={refreshKey}
  />
)}

        </div>

    </div>

</div>
    </div>
  );
}