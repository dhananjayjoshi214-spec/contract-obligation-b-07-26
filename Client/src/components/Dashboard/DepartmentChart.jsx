import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import api from "../../api";

const DepartmentChart = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await api.get("/dashboard/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getBarColor = (score) => {
  if (score >= 90) {
    return "#10B981";
  }

  return "#EF4444";
};
  // Green if score is at or above target (90%)
  // Red otherwise



  return (
    <div className="chart-card">
      <h3 style={{ marginBottom: "20px" }}>
        Department Compliance
      </h3>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          layout="vertical"
          data={departments}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            hide
          />

          <YAxis
            type="category"
            dataKey="department"
            width={100}
          />

          <Tooltip />

          <Bar
            dataKey="score"
            radius={[0, 8, 8, 0]}
            barSize={12}
          >
            {departments.map((entry, index) => (
              <Cell
  key={index}
 fill={getBarColor(entry.score)}
/>
            ))}

            <LabelList
              dataKey="score"
              position="right"
              formatter={(value) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;