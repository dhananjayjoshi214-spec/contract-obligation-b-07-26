import { useEffect, useState, useCallback } from "react";
import { contractsApi } from "../services/contractsApi";

export function useContracts({ search, type, status }) {
  const [contracts, setContracts] = useState([]);
  const [summary, setSummary] = useState({ total: 0, active: 0, expiring_soon: 0, showing: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = { search, type, status };
      const [contractsData, summaryData] = await Promise.all([
        contractsApi.list(filters),
        contractsApi.summary(filters),
      ]);
      setContracts(contractsData);
      setSummary(summaryData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, type, status]);

  useEffect(() => {
    load();
  }, [load]);

  return { contracts, summary, loading, error, refetch: load };
}
