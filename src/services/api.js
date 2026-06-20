const API_BASE_URL = 'http://localhost:3001/api';

// Helper: fetch with a 10-second timeout so loading never hangs forever
const fetchWithTimeout = async (url, options = {}, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products`);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

// Get products by type (men, women, kids)
export const getProductsByType = async (type) => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/${type}`);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error(`Error fetching ${type} products:`, error);
    return [];
  }
};

// Get products by type and category
export const getProductsByTypeAndCategory = async (type, category) => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/${type}?category=${category}`);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error(`Error fetching ${type} ${category} products:`, error);
    return [];
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/id/${id}`);
    const data = await response.json();
    return data.product || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/featured`);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};
