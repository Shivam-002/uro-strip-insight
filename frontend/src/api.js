import { ENDPOINTS } from "./utils";

import axios from "axios";

export const urine_test = async (file, on_success, on_failure) => {
  const endpoint = `${ENDPOINTS.URINE_TEST}`;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    on_success(response.data);
  } catch (error) {
    on_failure(error.response ? error.response.data : error.message);
  }
};
