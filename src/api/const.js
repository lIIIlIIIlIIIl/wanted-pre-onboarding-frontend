import axios from "axios";

const API_URL = "https://www.pre-onboarding-selection-task.shop/";

const Axios = axios.create({
  baseURL: API_URL,
});

export default Axios;
