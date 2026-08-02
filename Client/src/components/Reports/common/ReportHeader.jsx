import React from "react";

import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  FileDown,
  FileSpreadsheet
} from "lucide-react";

import "../../../assets/reportHeader.css";


export default function ReportHeader({
    showFilters,
    setShowFilters,
    search,
    setSearch,
    onSearch,
    onRefresh,
    onExportPDF,
    onExportExcel
}){

return (

<div className="report-header-wrapper">


    {/* LEFT CONTENT */}

    <div className="report-header-content">


        <h2>
            Reports & Exports
        </h2>


        <p>
            Contract · Compliance · Renewal · Obligation · Audit — all reports in one place
        </p>


    </div>





    {/* ACTION AREA */}

    <div className="report-header-actions">



        {/* SEARCH */}

        <div className="report-search">


            <Search size={18}/>


            <input
    type="text"
    value={search}
    placeholder="Search contracts, obligations..."
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e)=>{

        if(e.key === "Enter"){
            onSearch();
        }

    }}
/>


        </div>





        {/* FILTER */}

        <button
    className="header-action-btn"
    onClick={() => setShowFilters(!showFilters)}
>


            <SlidersHorizontal size={17}/>

            {showFilters ? "Hide Filters" : "Show Filters"}


        </button>





        {/* REFRESH */}

       <button
    className="icon-action-btn"
    onClick={onRefresh}
>


            <RefreshCw size={18}/>


        </button>






        {/* PDF */}

        <button 
    className="export-pdf-btn"
    onClick={onExportPDF}
>

    <FileDown size={17}/>

    Export PDF

</button>






        {/* EXCEL */}

        <button 
    className="export-excel-btn"
    onClick={onExportExcel}
>

    <FileSpreadsheet size={17}/>

    Export Excel

</button>



    </div>



</div>

);

}