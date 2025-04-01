export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`/api/v1/allProducts`); // Adjust API route if needed
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}