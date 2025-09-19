import { BASE_URL } from "@/data/constants";

export async function getAllProducts({
  page = 1,
  priceFrom,
  priceTo,
  sort,
}: {
  page?: number;
  priceFrom?: number;
  priceTo?: number;
  sort?: string;
} = {}) {
  try {
    const params = new URLSearchParams();

    params.append("page", String(page));

    if (priceFrom !== undefined) {
      params.append("filter[price_from]", String(priceFrom));
    }
    if (priceTo !== undefined) {
      params.append("filter[price_to]", String(priceTo));
    }

    // optional sorting
    if (sort) {
      params.append("sort", sort);
    }

    const url = `${BASE_URL}products?${params.toString()}`;

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store", // 🔑 ensures fresh data every time
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return await response.json(); // should contain { data, meta }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [], meta: {} };
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
