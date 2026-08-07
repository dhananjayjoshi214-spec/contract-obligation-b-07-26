import React, { useEffect, useState } from "react";
import api from "../../../api";
import { SlidersHorizontal, X } from "lucide-react";
import "../../../assets/filterSidebar.css";


export default function FilterSidebar({ onApplyFilters }) {


const [filters, setFilters] = useState({});
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [message, setMessage] = useState("");
const [selectedFilters, setSelectedFilters] = useState({
  status: "",
  vendor: "",
  department: "",
  priority: "",
  compliance_status: "",
  renewal_status: "",
  assigned_user: "",
  report_type: ""
});
useEffect(() => {
    api.get("/api/reports/contracts/filters")
        .then((res) => setFilters(res.data))
        .catch((err) => console.error(err));
}, []);
const applyFilters = () => {

  onApplyFilters({
    start_date: startDate,
    end_date: endDate,

    status: selectedFilters.status,
    vendor: selectedFilters.vendor,
    department: selectedFilters.department,

    priority: selectedFilters.priority,
    compliance_status: selectedFilters.compliance_status,
    renewal_status: selectedFilters.renewal_status,
    assigned_user: selectedFilters.assigned_user,
    report_type: selectedFilters.report_type
});

  setMessage("Filters applied successfully!");

  setTimeout(() => {
    setMessage("");
  }, 3000);

};

const clearFilters = () => {

  setStartDate("");
  setEndDate("");

  setSelectedFilters({
  status: "",
  vendor: "",
  department: "",
  priority: "",
  compliance_status: "",
  renewal_status: "",
  assigned_user: "",
  report_type: ""
});

  onApplyFilters({});

  setMessage("Filters cleared!");

  setTimeout(() => {
    setMessage("");
  }, 3000);

};
return (

<aside className="figma-filter-sidebar">


    {/* HEADER */}

    <div className="figma-filter-header">

        <div>

            <SlidersHorizontal size={14}/>

            <span>
                FILTERS
            </span>

        </div>


        <X size={15}/>

    </div>





    <div className="filter-scroll">


        {/* DATE RANGE */}

        <div className="figma-filter-group">

            <label>
                DATE RANGE
            </label>


            
    <input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
/>

<input
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
/>

        </div>





        {Object.entries(filters).map(([label, options]) => (

    <div
        className="figma-filter-group"
        key={label}
    >

        <label>
            {label.replace("_", " ").toUpperCase()}
        </label>

        <select
  value={selectedFilters[label] || ""}
  onChange={(e) =>
    setSelectedFilters({
      ...selectedFilters,
      [label]: e.target.value
    })
  }
>

  <option value="">All</option>

  {options.map(option => (
    <option
      key={option}
      value={option}
    >
      {option}
    </option>
  ))}

</select>

    </div>

))}



    </div>




{message && (
  <div className="filter-message">
    {message}
  </div>
)}

    {/* FOOTER BUTTONS */}

    <div className="filter-footer">


        <button
  className="apply-btn"
  onClick={applyFilters}
>
    Apply Filters
</button>

<button
  className="clear-btn"
  onClick={clearFilters}
>
  Clear All Filters
</button>


    </div>



</aside>


);

}