import { useState } from "react";
import { Sidebar } from "./layout/Sidebar";
import { Navbar } from "./layout/Navbar";
import { ContractRepository } from "./features/contracts/components/ContractRepository";
import { ContractDetail } from "./features/contracts/components/ContractDetail";

export default function App() {
  const [selectedContractId, setSelectedContractId] = useState(null);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar title="Contract Repository" subtitle="June 3, 2024" />
        {selectedContractId ? (
          <ContractDetail contractId={selectedContractId} onBack={() => setSelectedContractId(null)} />
        ) : (
          <ContractRepository onSelectContract={setSelectedContractId} />
        )}
      </div>
    </div>
  );
}
