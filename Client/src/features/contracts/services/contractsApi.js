import { apiClient } from "../../../utils/apiClient";

function buildQuery(params) {
  const usable = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "" && v !== "All"
  );
  if (usable.length === 0) return "";
  return "?" + new URLSearchParams(Object.fromEntries(usable)).toString();
}

export const contractsApi = {
  list: ({ search, type, status } = {}) =>
    apiClient.get(`/api/contracts${buildQuery({ search, type, status })}`),

  summary: ({ search, type, status } = {}) =>
    apiClient.get(`/api/contracts/summary${buildQuery({ search, type, status })}`),

  get: (id) => apiClient.get(`/api/contracts/${id}`),

  create: (payload) => apiClient.post("/api/contracts", payload),

  update: (id, payload) => apiClient.patch(`/api/contracts/${id}`, payload),

  remove: (id) => apiClient.delete(`/api/contracts/${id}`),
};
