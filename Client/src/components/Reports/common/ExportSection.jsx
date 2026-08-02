import React from "react";
import "../../../assets/reports.css";

function ExportSection({
    pdfOptions,
    excelOptions,
    setPdfOptions,
    setExcelOptions,
    exportPDF,
    exportExcel
}) {

return (

(pdfOptions?.length > 0 || excelOptions?.length > 0) && (

<div className="export-section">


{/* PDF EXPORT */}

{
pdfOptions?.length > 0 && (

<div className="export-card">

<h3>
PDF Export
</h3>


<p>
Professional report with charts and summary statistics
</p>


<div className="export-options">

{
pdfOptions.map((item,index)=>(

<label key={item.label}>

<input
type="checkbox"
checked={item.checked}
onChange={()=>{

const updated=[...pdfOptions];

updated[index].checked =
!updated[index].checked;

setPdfOptions(updated);

}}
/>

{item.label}

</label>

))
}

</div>


<div className="export-buttons">

<button
className="primary-btn"
onClick={exportPDF}
>
Export Current Report
</button>


<button
className="secondary-btn"
onClick={exportPDF}
>
Export Filtered
</button>


</div>


</div>

)

}



{/* EXCEL EXPORT */}

{
excelOptions?.length > 0 && (

<div className="export-card">


<h3>
Excel Export
</h3>


<p>
Multi-worksheet workbook with formatted tables
</p>



<div className="export-options">


{
excelOptions.map((item,index)=>(

<label key={item.label}>

<input
type="checkbox"
checked={item.checked}
onChange={()=>{

const updated=[...excelOptions];

updated[index].checked =
!updated[index].checked;

setExcelOptions(updated);

}}
/>

{item.label}

</label>

))

}


</div>


<div className="export-buttons">


<button
className="success-btn"
onClick={exportExcel}
>
Export Full Dataset
</button>


<button
className="secondary-btn"
onClick={exportExcel}
>
Export Filtered
</button>


</div>


</div>

)

}


</div>

)

);

}


export default ExportSection;