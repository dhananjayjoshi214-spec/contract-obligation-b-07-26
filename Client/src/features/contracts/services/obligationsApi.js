import { apiClient } from "../../../utils/apiClient";

export const obligationsApi = {
  list: (contractId) =>
    apiClient.get(
      contractId ? `/api/obligations?contract_id=${contractId}` : "/api/obligations"
    ),
};
