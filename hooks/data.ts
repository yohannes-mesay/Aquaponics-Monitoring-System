import axios from "axios";
export const getData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/temperature`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
