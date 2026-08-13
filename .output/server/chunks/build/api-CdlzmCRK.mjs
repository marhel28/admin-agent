const BASE_URL = "https://cctv-api.desa-sidomukti.com";
async function apiFetch(path, options = {}) {
  const url = new URL(`${BASE_URL}${path.startsWith("/") ? path : "/" + path}`);
  if (options.params) {
    Object.entries(options.params).forEach(([k, v]) => url.searchParams.append(k, v));
  }
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(url.toString(), { ...options, headers });
  if (response.status === 401 && false) ;
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request failed (${response.status})`);
  }
  return handleResponse(response);
}
async function handleResponse(response) {
  if (response.status === 204) return null;
  return response.json();
}
const api = {
  get: (path, opts) => apiFetch(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => apiFetch(path, { ...opts, method: "POST", body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: (path, body, opts) => apiFetch(path, { ...opts, method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body, opts) => apiFetch(path, { ...opts, method: "PATCH", body: JSON.stringify(body) }),
  delete: (path, opts) => apiFetch(path, { ...opts, method: "DELETE" })
};

export { api as a };
//# sourceMappingURL=api-CdlzmCRK.mjs.map
