import { useEffect, useState, useCallback } from "react";
import { contractsApi } from "../services/contractsApi";
import { obligationsApi } from "../services/obligationsApi";

export function useContract(contractId) {
  const [contract, setContract] = useState(null);
  const [obligations, setObligations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!contractId) return;
    setLoading(true);
    setError(null);
    try {
      const [contractData, obligationsData] = await Promise.all([
        contractsApi.get(contractId),
        obligationsApi.list(contractId),
      ]);
      setContract(contractData);
      setObligations(obligationsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [contractId]);

  useEffect(() => {
    load();
  }, [load]);

  return { contract, obligations, loading, error, refetch: load };
}
