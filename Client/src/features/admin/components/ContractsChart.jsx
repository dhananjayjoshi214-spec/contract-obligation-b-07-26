import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { monthlyContracts } from "../data/dashboardData";

function ContractsChart() {
  return (
    <div className="card shadow-sm border-0 p-3">

      <h5 className="mb-3">
        Monthly Contracts
      </h5>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={monthlyContracts}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <Tooltip />

          <Bar
            dataKey="contracts"
            fill="#0d6efd"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ContractsChart;