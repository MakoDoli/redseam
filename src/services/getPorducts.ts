import { BASE_URL } from "@/data/constants";

export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}products`);
    const products = await response.json();
    return products.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
