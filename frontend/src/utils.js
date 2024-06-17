export const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
export const BACKEND_API = "/api/v1/";
export const BASE_URL = `${BACKEND_HOST}${BACKEND_API}`;
export const ENDPOINTS = {
  URINE_TEST: `${BASE_URL}query-test`,
};

export const States = {
  WAITING_FOR_UPLOAD: "WAITING_FOR_UPLOAD",
  PROCESSING_IMAGE: "PROCESSING_IMAGE",
  RESULT_READY: "RESULT_READY",
};
